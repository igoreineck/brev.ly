import { isRight, unwrapEither } from "@/shared/either";
import { describe, expect, it } from "vitest";
import { createLink } from "./create-link";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";

describe("create link", () => {
  it("creates a shortened link correctly", async () => {
    const newLink = await createLink({
      name: "link-1",
      originalUrl: "https://google.com",
    });

    expect(isRight(newLink)).toBe(true);

    const link = unwrapEither(newLink);
    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.name, link.name));

    expect(result).toHaveLength(1);
  });
});
