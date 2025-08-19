import { describe, expect, it, beforeEach } from "vitest";
import { createLink } from "./create-link";
import { deleteLink } from "./delete-link";
import { isRight, unwrapEither } from "@/shared/either";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { cleanTestDatabase } from "@/test/setup";

describe("delete link", () => {
  beforeEach(async () => {
    await cleanTestDatabase();
  });

  it("deletes a link successfully", async () => {
    const newLink = await createLink({
      name: `link-1`,
      originalUrl: "https://google.com",
    });

    expect(isRight(newLink)).toBe(true);

    const link = unwrapEither(newLink);
    const deleteResult = await deleteLink({ id: link.id });

    expect(unwrapEither(deleteResult)).toEqual(link);

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, link.id));

    expect(result).toHaveLength(0);
  });
});
