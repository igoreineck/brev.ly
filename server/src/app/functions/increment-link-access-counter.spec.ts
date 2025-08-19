import { isRight, unwrapEither } from "@/shared/either";
import { createFakeLink } from "@/test/factories/create-fake-link";
import { describe, expect, it, beforeEach } from "vitest";
import { incrementLinkAccessCounter } from "./increment-link-access-counter";
import { cleanTestDatabase } from "@/test/setup";

describe("increment link access counter", () => {
  beforeEach(async () => {
    await cleanTestDatabase();
  });

  it("changes the access counter", async () => {
    const link = await createFakeLink({
      name: `google-1`,
      originalUrl: "https://google.com",
    });

    expect(link.accessCounter).toBe(0);

    const result = await incrementLinkAccessCounter({ id: link.id });
    expect(isRight(result)).toBe(true);

    const updatedLink = unwrapEither(result);
    expect(updatedLink.accessCounter).toBe(1);
  });
});
