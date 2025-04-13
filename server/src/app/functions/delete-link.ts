import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import { type Either, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";

const deleteLinkInput = z.object({
  id: z.string(),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

type DeleteLinkOutput = {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: number;
  createdAt: Date;
};

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<never, DeleteLinkOutput>> {
  const { id } = deleteLinkInput.parse(input);

  const [link] = await db
    .delete(schema.links)
    .where(eq(schema.links.id, id))
    .returning();

  return makeRight(link);
}
