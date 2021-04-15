import { ApolloServer } from "apollo-server-micro";
// import { ApolloServer } from "apollo-server-express";
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

// console.log("apolloServer", apolloServer.applyMiddleware);

const graphqlHandler = apolloServer.createHandler({ path: "/api/graphql" });

handler
  .use(auth)
  .use((req, res, next) => {
    console.log("req.headers in graphql endpoint ->s", req.headers);
    next();
  })
  .use(graphqlHandler);

// graphqlHandler.arguments(auth);
// console.log("graphqlHandler", graphqlHandler);

export default handler;

// export default apolloServer.createHandler({ path: "/api/graphql" });
