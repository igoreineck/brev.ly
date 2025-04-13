import { incrementLinkAccessCounter } from "@/app/functions/increment-link-access-counter";
import { isRight, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const incrementLinkAccessCounterRoute: FastifyPluginAsyncZod = async (
  server
) => {
  server.post(
    "/links/:id/increment-counter",
    {
      schema: {
        summary: "Increment the link access counter",
        tags: ["links"],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            originalUrl: z.string(),
            accessCounter: z.number(),
            createdAt: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const result = await incrementLinkAccessCounter({ id });

      if (isRight(result)) {
        const link = unwrapEither(result);
        return reply.status(200).send(link);
      }

      return reply.status(204).send();
    }
  );
};
