import { isRight, unwrapEither } from "@/shared/either";
import { describe, expect, it, beforeAll } from "vitest";
import { createLink } from "./create-link";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { cleanTestDatabase } from "@/test/setup";

describe("create link", () => {
  beforeAll(async () => {
    await cleanTestDatabase();
  });

  it("creates a shortened link correctly", async () => {
    const timestamp = Date.now();
    const newLink = await createLink({
      name: `link-1-${timestamp}`,
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
