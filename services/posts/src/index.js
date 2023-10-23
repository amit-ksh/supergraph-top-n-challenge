import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "graphql-tag";

import resolvers from "./resolvers.js";

const schema = {
  typeDefs: gql`
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
  `,
  resolvers,
};

const port = process.env.PORT || 4002;
const server = new ApolloServer({
  schema: buildSubgraphSchema(schema),
});

const { url } = await startStandaloneServer(server, { listen: { port } });

console.log(`🚀 Server listening at: ${url}`);
