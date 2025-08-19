import { isRight, unwrapEither } from "@/shared/either";
import { createFakeLink } from "@/test/factories/create-fake-link";
import { describe, expect, it, beforeEach } from "vitest";
import { findLinkByName } from "./find-link";
import { cleanTestDatabase } from "@/test/setup";

describe("find link by name", () => {
  beforeEach(async () => {
    await cleanTestDatabase();
  });

  it("returns the link with the given name", async () => {
    const link = await createFakeLink({
      name: `ggl-1`,
      originalUrl: "https://google.com",
    });

    const foundLink = await findLinkByName({ name: link.name });
    const result = unwrapEither(foundLink);

    expect(isRight(foundLink)).toBe(true);
    expect(result).toEqual(link);
  });

  it("does NOT return a link if it does not exist", async () => {
    const foundLink = await findLinkByName({ name: "non-existent-link" });
    expect(isRight(foundLink)).toBe(false);
  });
});
