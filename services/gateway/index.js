import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "Posts", url: process.env.POSTS_URL || "http://localhost:4002" },
      {
        name: "Threads",
        url: process.env.THREADS_URL || "http://localhost:4001",
      },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

const port = process.env.PORT || 8000;
const { url } = await startStandaloneServer(server, { listen: { port } });
console.log(`🚀 Gateway Server ready at ${url}`);
