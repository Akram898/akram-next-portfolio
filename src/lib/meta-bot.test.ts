import crypto from "node:crypto";
import { dmText, extractComments, matchGuide, publicReply, validSignature, words } from "./meta-bot";

const guides = [
  { keyword: "AI", slug: "automate-video-creation", title: "Automate video" },
  { keyword: "SEEDANCE", slug: "seedance-25-features", title: "Seedance 2.5" },
  { keyword: "SEEDANCE20", slug: "seedance-2", title: "Seedance 2.0" },
];

describe("matchGuide", () => {
  it("matches a keyword as a whole word, any case, with emoji around it", () => {
    expect(matchGuide("seedance 🔥🔥", guides)?.slug).toBe("seedance-25-features");
    expect(matchGuide("Seedance20!", guides)?.slug).toBe("seedance-2");
  });
  it("prefers the longest keyword when several match", () => {
    expect(matchGuide("AI SEEDANCE20 please", guides)?.slug).toBe("seedance-2");
  });
  it("does not match inside other words", () => {
    expect(matchGuide("said it was fair", guides)).toBeNull();
    expect(matchGuide("seedances", guides)).toBeNull();
  });
  it("works next to Arabic text", () => {
    expect(matchGuide("عايز الرابط AI لو سمحت", guides)?.slug).toBe("automate-video-creation");
    expect(words("ابعتلي:SEEDANCE")).toContain("SEEDANCE");
  });
});

describe("messages", () => {
  it("builds Arabic and English DMs with the guide link", () => {
    expect(dmText(guides[1], "ar", "instagram")).toContain("https://ahmedakram.com/guides/seedance-25-features?");
    expect(dmText(guides[1], "en", "facebook")).toContain("utm_source=facebook");
  });
  it("picks the same public reply for the same comment", () => {
    expect(publicReply("123", "en")).toBe(publicReply("123", "en"));
  });
});

describe("validSignature", () => {
  const body = '{"object":"instagram"}';
  const sign = (s: string) => "sha256=" + crypto.createHmac("sha256", s).update(body).digest("hex");
  it("accepts either secret and rejects anything else", () => {
    expect(validSignature(body, sign("ig"), ["meta", "ig"])).toBe(true);
    expect(validSignature(body, sign("other"), ["meta", "ig"])).toBe(false);
    expect(validSignature(body, null, ["meta"])).toBe(false);
    expect(validSignature(body, sign(""), ["", ""])).toBe(false);
  });
});

describe("extractComments", () => {
  it("reads Instagram comment events", () => {
    const events = extractComments({
      object: "instagram",
      entry: [{ id: "17841", changes: [{ field: "comments", value: { id: "c1", text: "AI", from: { id: "u9", username: "fan" } } }] }],
    });
    expect(events).toEqual([{ platform: "instagram", accountId: "17841", commentId: "c1", text: "AI", fromId: "u9", fromUsername: "fan" }]);
  });
  it("reads Facebook Page comment adds and skips edits and likes", () => {
    const events = extractComments({
      object: "page",
      entry: [{ id: "p1", changes: [
        { field: "feed", value: { item: "comment", verb: "add", comment_id: "c2", message: "AI", from: { id: "u1" } } },
        { field: "feed", value: { item: "comment", verb: "edited", comment_id: "c3", message: "AI" } },
        { field: "feed", value: { item: "reaction", verb: "add" } },
      ] }],
    });
    expect(events.map((e) => e.commentId)).toEqual(["c2"]);
  });
  it("ignores junk", () => {
    expect(extractComments({})).toEqual([]);
    expect(extractComments({ object: "instagram", entry: "x" })).toEqual([]);
  });
});
