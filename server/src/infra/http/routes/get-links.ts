import { getLinks } from "@/app/functions/get-links";
import { unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links",
    {
      schema: {
        summary: "Get links",
        tags: ["links"],
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                originalUrl: z.string(),
                accessCounter: z.number(),
                createdAt: z.date(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await getLinks();
      const { links, total } = unwrapEither(result);

      return reply.status(200).send({ links, total });
    }
  );
};
