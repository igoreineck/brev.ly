import { isRight, unwrapEither } from "@/shared/either";
import { createFakeLink } from "@/test/factories/create-fake-link";
import { describe, expect, it, beforeEach } from "vitest";
import { getLinks } from "./get-links";
import { cleanTestDatabase } from "@/test/setup";

describe("get links", () => {
  beforeEach(async () => {
    await cleanTestDatabase();
  });

  it("returns a list of links", async () => {
    const link1 = await createFakeLink({
      name: `google-1`,
      originalUrl: "https://google.com",
    });
    const link2 = await createFakeLink({
      name: `google-2`,
      originalUrl: "https://google.com",
    });

    const links = await getLinks();
    const result = unwrapEither(links);

    expect(isRight(links)).toBe(true);
    expect(result.total).toEqual(2);
    expect(result.links).toEqual([
      expect.objectContaining({ id: link1.id }),
      expect.objectContaining({ id: link2.id }),
    ]);
  });
});
