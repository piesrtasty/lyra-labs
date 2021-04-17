import { ApolloServer } from "apollo-server-micro";
import nextConnect from "next-connect";
import { schema } from "../../lib/schema";
import auth from "../../middleware/auth";
import prisma from "../../lib/prisma";

const handler = nextConnect();

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

const graphqlHandler = apolloServer.createHandler({ path: "/api/graphql" });

handler.use(auth).use(graphqlHandler);

export default handler;
