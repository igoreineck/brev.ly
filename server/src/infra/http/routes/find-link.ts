import { findLinkByName } from "@/app/functions/find-link";
import { isRight, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const findLinkByNameRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links/:name",
    {
      schema: {
        summary: "Find link by name",
        tags: ["links"],
        params: z.object({
          name: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            originalUrl: z.string(),
            accessCounter: z.number(),
            createdAt: z.date(),
          }),
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { name } = request.params;

      const result = await findLinkByName({ name });

      if (isRight(result)) {
        const link = unwrapEither(result);
        return reply.status(200).send(link);
      }

      return reply.status(204).send();
    }
  );
};
