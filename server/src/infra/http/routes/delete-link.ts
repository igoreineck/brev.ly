import { deleteLink } from "@/app/functions/delete-link";
import { isRight, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete a link",
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
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const result = await deleteLink({ id });

      if (isRight(result)) {
        const link = unwrapEither(result);
        return reply.status(200).send(link);
      }

      return reply.status(204).send();
    }
  );
};
