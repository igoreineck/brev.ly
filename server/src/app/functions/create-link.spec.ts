import { isLeft, isRight, unwrapEither } from "@/shared/either";
import { describe, expect, it, beforeEach } from "vitest";
import { createLink } from "./create-link";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { cleanTestDatabase } from "@/test/setup";

describe("create link", () => {
  beforeEach(async () => {
    await cleanTestDatabase();
  });

  it("creates a shortened link correctly", async () => {
    const newLink = await createLink({
      name: `link-1`,
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

  it("does NOT create a link with an existing name", async () => {
    const newLink = await createLink({
      name: `link-1`,
      originalUrl: "https://google.com",
    });

    expect(isRight(newLink)).toBe(true);

    const link = unwrapEither(newLink);
    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.name, link.name));

    expect(result).toHaveLength(1);

    const duplicateLink = await createLink({
      name: `link-1`,
      originalUrl: "https://google.com",
    });

    expect(isLeft(duplicateLink)).toBe(true);
    expect(unwrapEither(duplicateLink)).toEqual(
      new Error("Essa URL encurtada já existe.")
    );
  });
});
