import {
  configureWunderGraphApplication,
  cors,
  introspect,
} from "@wundergraph/sdk";
import server from "./wundergraph.server";
import operations from "./wundergraph.operations";

const federatedApi = introspect.federation({
  upstreams: [
    {
      name: "Threads",
      url: new URL("/query", "http://host.docker.internal:4001/").href,
    },
    {
      name: "Posts",
      url: new URL("/query", "http://host.docker.internal:4002/").href,
    },
  ],
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [federatedApi],
  server,
  operations,
  cors: {
    ...cors.allowAll,
  },
  security: {
    enableGraphQLEndpoint: true,
  },
});
