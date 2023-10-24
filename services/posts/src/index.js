import Fastify from "fastify";
import mercuriusWithFederation from "@mercuriusjs/federation";

import db from "./db.js";

const schema = /* GraphQL */ `
  scalar DateTime

  type Post @key(fields: "id") {
    id: Int!
    created: DateTime!
    thread_id: Int!
  }

  extend type Thread @key(fields: "id") {
    id: Int! @external
    posts(limit: Int!): [Post]
  }
`;
const resolvers = {
  Thread: {
    posts: async (thread, { limit }) => {
      const { rows } = await db.query(
        `SELECT * FROM posts WHERE thread_id = $1 ORDER BY created DESC LIMIT $2`,
        [thread.id, limit]
      );

      return rows;
    },
  },
};

const port = process.env.PORT || 4002;
const service = Fastify();
service.register(mercuriusWithFederation, {
  schema,
  resolvers,
  graphiql: true,
});

service.get("/", async function () {
  const query = "{ _service { sdl } }";
  return service.graphql(query);
});

service.listen({ port, host: "0.0.0.0" }, () => {
  console.log(`🚀 Server listening at: http://localhost:${port}`);
});
