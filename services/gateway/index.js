import Fastify from "fastify";
import mercuriusWithGateway from "@mercuriusjs/gateway";

const gateway = Fastify();
const port = process.env.PORT || 8000;

gateway.register(mercuriusWithGateway, {
  graphiql: true,
  gateway: {
    services: [
      {
        name: "threads",
        url: process.env.THREADS_URL || "http://localhost:4001/graphql",
      },
      {
        name: "posts",
        url: process.env.POSTS_URL || "http://localhost:4002/graphql",
      },
    ],
  },
});

gateway.listen({ port, host: "0.0.0.0" }, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`🚀 Gateway Server ready at http://localhost:${port}`);
});
