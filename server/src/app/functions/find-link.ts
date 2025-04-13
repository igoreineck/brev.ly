import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import { type Either, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";

const findLinkByNameInput = z.object({
  name: z.string(),
});

type FindLinkByNameInput = z.input<typeof findLinkByNameInput>;

type FindLinkOutput = {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: number;
  createdAt: Date;
};

export async function findLinkByName(
  input: FindLinkByNameInput
): Promise<Either<never, FindLinkOutput>> {
  const { name } = findLinkByNameInput.parse(input);

  const [link] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.name, name));

  return makeRight(link);
}
