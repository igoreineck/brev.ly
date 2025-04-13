import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/shared/either";
import { count, desc } from "drizzle-orm";

type GetLinksOutput = {
  links: {
    id: string;
    name: string;
    originalUrl: string;
    viewCounter: number;
    createdAt: Date;
  }[];
  total: number;
};

export async function getLinks(): Promise<Either<never, GetLinksOutput>> {
  const [links, [{ total }]] = await Promise.all([
    db
      .select({
        id: schema.links.id,
        name: schema.links.name,
        originalUrl: schema.links.originalUrl,
        viewCounter: schema.links.viewCounter,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .orderBy((fields) => desc(fields.id)),
    db.select({ total: count(schema.links.id) }).from(schema.links),
  ]);

  return makeRight({ links, total });
}
