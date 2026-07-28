---
title: "Build a WhatsApp AI assistant that can safely take action"
keyword: BUILD
summary: "A practical TypeScript architecture for receiving WhatsApp messages, continuing an OpenAI conversation, calling approved business tools, replying through the Cloud API, and handing difficult cases to a person."
publishedAt: "2026-07-29"
updatedAt: "2026-07-29"
readingMinutes: 11
tags: ["whatsapp", "openai", "automation", "ai-engineering"]
tone: "blue"
video:
  platform: instagram
  url: ""
status: live
---

You commented **BUILD**, so here is the complete implementation path.

The goal is not a bot that produces plausible text. The goal is a controlled action loop:

**receive → verify → reason → use an approved tool → confirm → reply or hand off**

![WhatsApp AI assistant connected to a controlled action core](/guides/whatsapp-ai-assistant-cover.png)

## What you are building

A customer sends a WhatsApp message. Meta delivers it to your HTTPS webhook. Your webhook
authenticates the payload, rejects duplicates, and queues the work. A worker continues the
customer's OpenAI conversation, executes only approved server-side tools, and sends the final
reply through the WhatsApp Cloud API.

```text
Customer
   ↓
WhatsApp Cloud API
   ↓ webhook
Verify signature → dedupe message ID → queue
   ↓
OpenAI Responses API ↔ approved business tools
   ↓
WhatsApp /messages endpoint OR human handoff
```

Keep the webhook, AI worker, business tools, and outbound sender separate. This makes retries,
permissions, audit logs, and human takeover much easier to reason about.

## What you need first

- A Meta business portfolio, WhatsApp Business Account, and registered business phone number.
- A Meta app with WhatsApp configured and a public HTTPS webhook.
- A system-user access token with the WhatsApp messaging permissions required by your setup.
- An OpenAI project and API key stored as a server-side secret.
- A small database for deduplication, conversation state, tool audit events, and handoff status.
- A queue. A durable database-backed job table is sufficient for a first production version.

Start with Meta's test number. Do not connect a customer-facing number until signature
verification, duplicate delivery, retries, and handoff have been tested.

## Environment variables

```bash
OPENAI_API_KEY=
META_APP_SECRET=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_GRAPH_VERSION=
```

Keep the Graph API version configurable. Pin and test a supported version instead of copying
an old version string from a tutorial.

## 1. Verify the webhook subscription

Meta calls the webhook with a GET request during setup. Return the challenge only when the
verify token matches.

```ts
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    token === process.env.WHATSAPP_VERIFY_TOKEN &&
    challenge
  ) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}
```

The verify token proves that the configuration request knows your shared value. It does not
replace signature verification for incoming message payloads.

## 2. Authenticate every incoming payload

Validate the `x-hub-signature-256` value against the raw request body using your Meta app
secret. Parse JSON only after the comparison succeeds.

```ts
import { createHmac, timingSafeEqual } from "node:crypto";

function validMetaSignature(rawBody: string, signature: string | null): boolean {
  if (!signature?.startsWith("sha256=")) return false;

  const expected = createHmac("sha256", process.env.META_APP_SECRET!)
    .update(rawBody)
    .digest("hex");

  const received = signature.slice("sha256=".length);
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(received, "hex");

  return a.length === b.length && timingSafeEqual(a, b);
}
```

Do not reconstruct or reserialize the JSON before checking it. The signature is calculated
from the exact payload bytes.

## 3. Acknowledge fast, process asynchronously

Webhook delivery should not wait for a model response. Extract supported message events,
claim the message ID in a unique database record, enqueue the job, and return success.

```ts
export async function POST(request: Request): Promise<Response> {
  const rawBody = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  if (!validMetaSignature(rawBody, signature)) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event: unknown = JSON.parse(rawBody);
  const messages = extractInboundMessages(event); // Validate with your schema.

  for (const message of messages) {
    const claimed = await claimMessageId(message.id); // Unique insert.
    if (claimed) await enqueueInboundMessage(message);
  }

  return Response.json({ ok: true });
}
```

WhatsApp can send non-message events and delivery status updates through the same webhook.
Treat unsupported event types as acknowledged no-ops, not application errors.

## 4. Continue one AI conversation per customer

The OpenAI Responses API supports threaded turns with `previous_response_id`. Store the most
recent response ID against your internal customer or conversation record.

```ts
import OpenAI from "openai";

const openai = new OpenAI();

async function startTurn(customerId: string, inboundText: string) {
  const session = await loadConversation(customerId);

  const response = await openai.responses.create({
    model: "gpt-5.6-terra",
    previous_response_id: session?.responseId,
    instructions: [
      "You are a concise customer-service assistant.",
      "Use only the supplied tools for business facts or actions.",
      "Ask for confirmation before any state-changing action.",
      "Request human handoff when policy or identity is unclear.",
    ].join("\n"),
    input: [{ role: "user", content: inboundText }],
    tools: approvedTools,
    store: true,
  });

  await saveConversation(customerId, response.id);
  return response;
}
```

Do not keep an unlimited conversation chain. Define retention, summarize or reset long
threads, and avoid sending sensitive data that the assistant does not need.

## 5. Give the model narrow, typed tools

Function calling lets the model propose structured arguments. Your application still owns
authentication, authorization, validation, and execution.

```ts
const approvedTools: OpenAI.Responses.Tool[] = [
  {
    type: "function",
    name: "lookup_order",
    description: "Look up one order belonging to the authenticated customer.",
    parameters: {
      type: "object",
      properties: {
        order_id: { type: "string" },
      },
      required: ["order_id"],
      additionalProperties: false,
    },
    strict: true,
  },
  {
    type: "function",
    name: "request_human_handoff",
    description: "Transfer the conversation to a support specialist.",
    parameters: {
      type: "object",
      properties: {
        reason: { type: "string" },
      },
      required: ["reason"],
      additionalProperties: false,
    },
    strict: true,
  },
];
```

Keep read tools separate from write tools. A useful first release can look up order status
and create a handoff ticket without being allowed to issue a refund or modify an address.

For a state-changing tool:

1. Authenticate the customer independently of the model.
2. Check that the object belongs to that customer.
3. Show the proposed change in plain language.
4. Require an explicit confirmation message.
5. Execute once with an idempotency key.
6. Log the actor, arguments, result, and timestamp.

## 6. Return tool results to the model

Append the response output and one `function_call_output` item for each executed function,
then request the final customer-facing response.

```ts
let input: OpenAI.Responses.ResponseInput = [
  { role: "user", content: inboundText },
];

let response = await openai.responses.create({
  model: "gpt-5.6-terra",
  input,
  tools: approvedTools,
});

input = [...input, ...response.output];

for (const item of response.output) {
  if (item.type !== "function_call") continue;

  const result = await executeApprovedTool({
    customerId,
    name: item.name,
    argumentsJson: item.arguments,
    idempotencyKey: `${inboundMessageId}:${item.call_id}`,
  });

  input.push({
    type: "function_call_output",
    call_id: item.call_id,
    output: JSON.stringify(result),
  });
}

response = await openai.responses.create({
  model: "gpt-5.6-terra",
  input,
  tools: approvedTools,
});
```

Bound the loop. A maximum tool-call count prevents a malformed conversation from creating
unlimited work.

## 7. Send the WhatsApp reply

Send text through the phone-number messages endpoint. Use your pinned Graph version and keep
the access token server-side.

```ts
async function sendWhatsAppText(to: string, body: string): Promise<string> {
  const version = process.env.WHATSAPP_GRAPH_VERSION!;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID!;

  const response = await fetch(
    `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { preview_url: false, body },
      }),
    },
  );

  if (!response.ok) throw new Error(`WhatsApp send failed: ${response.status}`);
  const result = await response.json() as { messages?: Array<{ id: string }> };
  const messageId = result.messages?.[0]?.id;
  if (!messageId) throw new Error("WhatsApp response did not include a message ID");
  return messageId;
}
```

A successful send response means the message was accepted. Store the returned message ID and
use webhook status events to track later delivery state.

## 8. Respect the messaging window

Inside the rolling customer-support window after a user message, a business can send
free-form replies. A business-initiated message outside that window requires an approved
message template. Keep this check in the outbound sender so every workflow follows it.

Do not let the model decide whether a template is required. Your application should use the
last inbound timestamp and the current Meta policy to select the permitted message type.

## 9. Design human takeover before launch

Create a handoff when:

- the user asks for a person
- identity or authorization is unclear
- the request is outside policy
- a high-impact action needs approval
- tools repeatedly fail
- confidence is low or the conversation is becoming frustrated

The specialist should receive the customer identity, concise conversation summary, relevant
records, attempted tools, errors, and the explicit reason for escalation. Pause automated
replies until the handoff is resolved.

## Production checklist

- Verify webhook signatures against the raw body.
- Deduplicate inbound message IDs.
- Acknowledge webhooks before slow work.
- Put model and tool execution behind a queue.
- Validate all external payloads and tool arguments.
- Authenticate the customer outside the model.
- Separate read and write permissions.
- Require confirmation for material changes.
- Use idempotency keys for every write.
- Cap retries, tool calls, and response length.
- Redact unnecessary personal data and define retention.
- Track outbound message IDs and status webhooks.
- Enforce the support-window and template rule in code.
- Provide human takeover with full context.
- Test duplicate delivery, timeouts, malformed payloads, tool failure, and provider outage.

## A sensible first version

Start with only three abilities:

1. Answer from a small approved knowledge base.
2. Look up one customer-owned record.
3. Create a human-support ticket.

Once those flows are reliable, add one confirmed write action such as rescheduling an
appointment. Reliability earns scope; the model should not begin with broad access.

## Primary sources

- [Meta WhatsApp Business Platform developer hub](https://whatsappbusiness.com/developers/developer-hub/)
- [Meta official WhatsApp Cloud API collection](https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api)
- [Meta webhook subscriptions](https://www.postman.com/meta/whatsapp-business-platform/folder/ozgs3jn/webhook-subscriptions)
- [Meta messages endpoint](https://www.postman.com/meta/whatsapp-business-platform/folder/o48mro7/messages)
- [Meta customer-support window](https://www.postman.com/meta/whatsapp-business-platform/folder/fuaee8l/statuses-object)
- [Meta signature-validation example](https://github.com/fbsamples/whatsapp-api-examples/tree/main/signature-validation-with-webhooks-payloads)
- [OpenAI API quickstart](https://developers.openai.com/api/docs/quickstart)
- [OpenAI conversation state](https://developers.openai.com/api/docs/guides/conversation-state)
- [OpenAI function calling](https://developers.openai.com/api/docs/guides/function-calling)

*The API shapes and platform rules in this guide were checked against the linked first-party
sources on 29 July 2026. Recheck them before a production launch.*
