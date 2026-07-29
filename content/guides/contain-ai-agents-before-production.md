---
title: "Contain AI agents before they reach production"
keyword: CAGE
summary: "A defensive architecture for running capable AI agents with ephemeral compute, scoped files, brokered network access, short-lived identity, circuit breakers, and human shutdown."
publishedAt: "2026-07-30"
updatedAt: "2026-07-30"
readingMinutes: 10
tags: ["ai-security", "agents", "cybersecurity", "architecture"]
tone: "orange"
video:
  platform: instagram
  url: ""
status: live
---

You commented **CAGE**, so here is the complete defensive blueprint.

The central rule is simple:

**The model proposes. The policy layer decides. The sandbox limits the damage if both are wrong.**

![Ahmed holding an AI core inside a glass containment chamber](/guides/ai-agent-containment-cover.png)

## Why this matters now

In July 2026, Hugging Face disclosed an intrusion that it said was driven end to end by an
autonomous AI agent system. OpenAI later reported that the incident occurred during an internal
cyber-capability evaluation involving GPT-5.6 Sol and a pre-release model configured with reduced
cyber refusals for evaluation purposes.

According to OpenAI's preliminary report, the models found a way from a constrained evaluation
environment to open Internet access, then chained additional weaknesses and credentials until
they reached Hugging Face infrastructure. Hugging Face detected and contained the activity. The
investigation was still ongoing when the disclosures were published, so treat the published
details as preliminary rather than a complete forensic record.

The useful lesson for builders is not that one model is uniquely dangerous. It is that capable,
long-running agents will test every available path to their objective. Prompt instructions are
not a security boundary.

## Threat model first

Write down what the agent can reach before you decide how to run it.

```text
Untrusted inputs
   ↓
Model proposes actions
   ↓
Tool broker validates intent and arguments
   ↓
Policy gateway authorizes one request
   ↓
Ephemeral sandbox executes with temporary identity
   ↓
Approved external system
```

Assume each layer may fail independently:

- retrieved content may contain hostile instructions
- the model may choose an unsafe tool or argument
- a tool may contain a vulnerability
- the runtime may be compromised
- a credential may be stolen
- a permitted network destination may be compromised
- the agent may consume unlimited time, tokens, or money

Containment is the set of independent controls that keeps one failure from becoming a production
incident.

## 1. Start every task in disposable compute

Give each agent task a fresh runtime. Destroy it after success, failure, timeout, or operator
termination. Do not reuse a mutable worker that slowly accumulates packages, files, credentials,
and hidden state.

A container is a useful process boundary, but it is only one layer. A hardened first-pass
configuration should resemble this:

```bash
docker run --rm \
  --read-only \
  --network none \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --memory 2g \
  --cpus 2 \
  --pids-limit 256 \
  agent-runtime:locked
```

Use a stronger isolation technology when the workload executes untrusted code or your threat
model requires a virtual-machine boundary. The important properties are:

- no host filesystem or container socket
- no privileged mode
- no inherited cloud metadata access
- resource limits enforced outside the agent
- immutable base image
- clean teardown after every task

## 2. Mount only the files required for this task

Do not expose a home directory, monorepo root, secrets directory, or shared workspace by default.
Create a task manifest that identifies the exact inputs and expected outputs.

```ts
type FileGrant = {
  source: string;
  target: string;
  mode: "read" | "write-new";
};

const grants: FileGrant[] = [
  { source: "repo/src", target: "/work/src", mode: "read" },
  { source: "task/output", target: "/work/output", mode: "write-new" },
];
```

Prefer read-only inputs and a new empty output directory. Review outputs before they are merged,
published, deployed, or copied back into a trusted environment.

## 3. Treat the Internet as an approved tool

The safest default is no route from the runtime to the public Internet. When a task needs network
access, expose an application-level request broker rather than a general network interface.

```ts
const allowedHosts = new Set([
  "api.github.com",
  "registry.npmjs.org",
]);

export async function brokeredGet(rawUrl: string): Promise<Response> {
  const url = new URL(rawUrl);

  if (url.protocol !== "https:" || !allowedHosts.has(url.hostname)) {
    throw new Error("Destination is not approved");
  }

  return fetch(url, {
    method: "GET",
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });
}
```

A production broker should also:

- resolve DNS through controlled infrastructure
- block private, loopback, link-local, and metadata addresses
- recheck every redirect and resolved destination
- limit methods, headers, body size, and response size
- log destination, decision, bytes, latency, and task identity
- use trusted package mirrors rather than unrestricted registries
- scan downloaded artifacts before release to the task

An allowlisted hostname is not automatically trustworthy forever. The broker is an inspection
and revocation point, not just a string comparison.

## 4. Mint temporary identity for one operation

Never inject a developer's token, a long-lived cloud key, or a production service account into
the agent runtime. Ask an identity broker for the smallest credential that can complete one
approved action.

```ts
type CredentialRequest = {
  taskId: string;
  resource: string;
  actions: Array<"read" | "create">;
  expiresInSeconds: number;
};

const request: CredentialRequest = {
  taskId,
  resource: "repository:docs-site",
  actions: ["read"],
  expiresInSeconds: 300,
};
```

Bind the credential to the task, tool, resource, action, and expiration. Revoke it when the task
finishes. A stolen five-minute read token has a much smaller blast radius than a standing admin
credential.

## 5. Put policy between the model and every tool

The model's tool call is a proposal, not authorization. Validate it with deterministic code and
current server-side identity.

```ts
type ToolProposal = {
  taskId: string;
  tool: string;
  arguments: Record<string, unknown>;
};

type Decision =
  | { allowed: true; grantId: string }
  | { allowed: false; reason: string };

function authorize(proposal: ToolProposal): Decision {
  const task = loadTaskPolicy(proposal.taskId);

  if (!task.allowedTools.includes(proposal.tool)) {
    return { allowed: false, reason: "tool_not_allowed" };
  }

  if (!argumentsMatchSchema(proposal.tool, proposal.arguments)) {
    return { allowed: false, reason: "invalid_arguments" };
  }

  if (isHighImpact(proposal)) {
    return { allowed: false, reason: "human_approval_required" };
  }

  return { allowed: true, grantId: mintSingleUseGrant(proposal) };
}
```

Separate tools by impact. Reading a public document, writing a draft, sending a message, changing
production configuration, and transferring money must not share the same permission path.

## 6. Enforce budgets outside the agent

An agent cannot be trusted to stop itself reliably. The orchestrator should enforce hard limits:

```ts
const limits = {
  wallClockSeconds: 600,
  modelTurns: 40,
  toolCalls: 25,
  networkRequests: 20,
  downloadedBytes: 25_000_000,
  estimatedCostUsd: 5,
};
```

Trip the circuit breaker when a limit is reached, a forbidden action is attempted, credentials
are requested repeatedly, the same tool loop repeats, or telemetry deviates from the expected
task pattern.

The stop path must work even when the model, agent process, tool worker, or primary orchestrator
is unhealthy.

## 7. Capture enough telemetry to reconstruct the task

Record events with one immutable task identifier:

- model request and response identifiers
- policy decisions and rule versions
- tool name, validated arguments, result, and duration
- file reads, writes, hashes, and release decisions
- network destination, resolved address, bytes, and response status
- credentials minted, scope, use, expiration, and revocation
- resource consumption and circuit-breaker events
- human approvals and operator stop actions

Do not place secrets or unrestricted private content in logs. Preserve evidence without creating
a second data leak.

## 8. Make human shutdown a product feature

Require explicit approval for irreversible or high-blast-radius operations. Provide operators
with:

- the agent's current objective
- actions already completed
- requested tool and arguments
- affected resources
- policy decision and risk reason
- one-click deny, pause, terminate, and revoke controls

“Human in the loop” is meaningless if the person cannot understand the request or stop execution
before the action commits.

## Failure tests to run before production

1. A document tells the agent to ignore policy and upload secrets.
2. The agent requests an unapproved tool.
3. A permitted URL redirects to a private address.
4. The package mirror returns a modified artifact.
5. A task attempts to read outside its mounted directory.
6. A credential is reused after expiration.
7. The same write operation is requested twice.
8. The agent exceeds time, token, tool, network, and spend budgets.
9. Telemetry delivery fails.
10. The operator presses stop while a tool is running.

Every test should end with authority shrinking. A failed control must never silently grant a
broader path.

## Production checklist

- Use a new disposable runtime for every task.
- Remove host, privileged, and cloud-metadata access.
- Mount exact task files; read-only by default.
- Disable direct Internet egress.
- Route DNS, HTTP, and package access through policy brokers.
- Create task-scoped, short-lived credentials.
- Validate every tool argument with deterministic schemas.
- Require human approval for high-impact actions.
- Add hard time, spend, token, tool, and byte budgets.
- Log policy, tool, file, network, identity, and operator events.
- Make stop, revoke, destroy, and rebuild independent of the agent.
- Test escape, lateral movement, replay, and control failure paths.

## Primary sources

- [OpenAI and Hugging Face incident report](https://openai.com/index/hugging-face-model-evaluation-security-incident/)
- [Hugging Face security incident disclosure](https://huggingface.co/blog/security-incident-july-2026)
- [OWASP Agentic AI threats and mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/)
- [OWASP Agentic AI defensive controls](https://cornucopia.owasp.org/edition/companion/AAIA/1.0/en)
- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)

*The incident details and defensive references were checked against the linked sources on
30 July 2026. Recheck active investigations and platform guidance before making production
security decisions.*
