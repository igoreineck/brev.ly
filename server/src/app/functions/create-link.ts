import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import { type Either, makeLeft, makeRight } from "@/shared/either";

const createLinkInput = z.object({
  name: z.string(),
  originalUrl: z.string(),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

type CreateLinkOutput = {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: number;
  createdAt: Date;
};

export async function createLink(
  input: CreateLinkInput
): Promise<Either<Error, CreateLinkOutput>> {
  const { name, originalUrl } = createLinkInput.parse(input);

  try {
    const [link] = await db
      .insert(schema.links)
      .values({
        name,
        originalUrl,
      })
      .returning();

    return makeRight(link);
  } catch (error) {
    return makeLeft(new Error("Essa URL encurtada já existe."));
  }
}
