import { createLink } from "@/app/functions/create-link";
import { isRight, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create link",
        tags: ["links"],
        body: z.object({
          name: z.string(),
          originalUrl: z.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
            originalUrl: z.string(),
            accessCounter: z.number(),
            createdAt: z.date(),
          }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { name, originalUrl } = request.body;
      const result = await createLink({
        name,
        originalUrl,
      });

      if (isRight(result)) {
        const link = unwrapEither(result);
        return reply.status(201).send(link);
      }

      const error = unwrapEither(result);

      return reply.status(400).send({ message: error.message });
    }
  );
};
