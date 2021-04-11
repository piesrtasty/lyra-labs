import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../lib/schema";
import prisma from "../../lib/prisma";

const apolloServer = new ApolloServer({
  schema,
  context: (req) => {
    return { ...req, prisma };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
