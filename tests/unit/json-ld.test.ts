import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/lib/json-ld";

describe("serializeJsonLd", () => {
  it("escapes script-breaking characters", () => {
    const result = serializeJsonLd({
      name: "</script><script>alert(1)</script>",
      text: "Ampersand & separators \u2028 \u2029",
    });

    expect(result).toContain("\\u003c/script\\u003e");
    expect(result).toContain("\\u0026");
    expect(result).toContain("\\u2028");
    expect(result).toContain("\\u2029");
    expect(result).not.toContain("</script>");
  });
});
