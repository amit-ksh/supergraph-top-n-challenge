import Fastify from "fastify";
import mercuriusWithFederation from "@mercuriusjs/federation";

import db from "./db.js";

const schema = /* GraphQL */ `
  scalar DateTime

  type Thread @key(fields: "id") {
    id: Int!
    created: DateTime
  }

  type Query {
    threads(limit: Int!): [Thread]
  }
`;

const resolvers = {
  Query: {
    threads: async (_, { limit }) => {
      const { rows } = await db.query(
        "SELECT * FROM threads ORDER BY created DESC LIMIT $1",
        [limit]
      );

      return rows;
    },
  },
};

const port = process.env.PORT || 4001;
const service = Fastify();
service.register(mercuriusWithFederation, {
  schema,
  resolvers,
  graphiql: true,
});

service.listen({ port, host: "0.0.0.0" }, () => {
  console.log(`🚀 Server listening at: http://localhost:${port}`);
});
