import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { transformSwaggerSchema } from "./transform-swagger-schema";
import { getLinksRoute } from "./routes/get-links";
import { createLinkRoute } from "./routes/create-link";
import { findLinkByNameRoute } from "./routes/find-link";
import { deleteLinkRoute } from "./routes/delete-link";
import { incrementLinkAccessCounterRoute } from "./routes/increment-link-access-counter";
import { exportLinksRoute } from "./routes/export-links";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.validation,
    });
  }

  console.error(error);

  return reply.status(500).send({ message: "Internal server error." });
});

server.register(fastifyCors, { origin: "*" });
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brev.ly Server",
      version: "1.0.0",
    },
  },
  transform: transformSwaggerSchema,
});
server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});
server.register(getLinksRoute);
server.register(createLinkRoute);
server.register(findLinkByNameRoute);
server.register(deleteLinkRoute);
server.register(incrementLinkAccessCounterRoute);
server.register(exportLinksRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server is running");
});
