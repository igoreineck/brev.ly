import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import { type Either, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";

const incrementLinkAccessCounterInput = z.object({
  id: z.string(),
});

type IncrementLinkAccessCounterInput = z.input<
  typeof incrementLinkAccessCounterInput
>;

type IncrementLinkAccessCounterOutput = {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: number;
  createdAt: Date;
};

export async function incrementLinkAccessCounter(
  input: IncrementLinkAccessCounterInput
): Promise<Either<never, IncrementLinkAccessCounterOutput>> {
  const { id } = incrementLinkAccessCounterInput.parse(input);

  const [{ accessCounter }] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.id, id));

  const [link] = await db
    .update(schema.links)
    .set({ accessCounter: accessCounter + 1 })
    .where(eq(schema.links.id, id))
    .returning();

  return makeRight(link);
}
