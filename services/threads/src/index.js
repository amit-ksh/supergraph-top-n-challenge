import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "graphql-tag";

import { Query } from "./resolvers.js";

const schema = {
  typeDefs: gql`
    extend schema
      @link(
        url: "https://specs.apollo.dev/federation/v2.0"
        import: ["@key", "@shareable", "@external"]
      )
    scalar DateTime

    type Thread @key(fields: "id") {
      id: Int!
      created: DateTime
    }

    type Query {
      threads(limit: Int!): [Thread]
    }
  `,
  resolvers: {
    Query,
  },
};

const port = process.env.PORT || 4001;
const server = new ApolloServer({
  schema: buildSubgraphSchema(schema),
});
const { url } = await startStandaloneServer(server, { listen: { port } });

console.log(`🚀 Server listening at: ${url}`);
