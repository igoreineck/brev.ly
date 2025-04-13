import { isRight, unwrapEither } from "@/shared/either";
import { createFakeLink } from "@/test/factories/create-fake-link";
import { describe, expect, it } from "vitest";
import { getLinks } from "./get-links";
import { afterEach } from "node:test";

describe("get links", () => {
  it("returns a list of links", async () => {
    const link1 = await createFakeLink({
      name: "google-1",
      originalUrl: "https://google.com",
    });
    const link2 = await createFakeLink({
      name: "google-3",
      originalUrl: "https://google.com",
    });

    const links = await getLinks();

    expect(isRight(links)).toBe(true);
    expect(unwrapEither(links).total).toEqual(2);
    expect(unwrapEither(links).links).toEqual([
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link1.id }),
    ]);
  });
});
