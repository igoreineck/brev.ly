import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

type CreateFakeLinkInput = {
  name: string;
  originalUrl: string;
};

export async function createFakeLink(input: CreateFakeLinkInput, database = db) {
  const result = await database.insert(schema.links).values(input).returning();

  return result[0];
}
