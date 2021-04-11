import { nexusPrisma } from "nexus-plugin-prisma";
import { makeSchema } from "@nexus/schema";
import { Query, Mutation, Post, User } from "./resolvers";

export const schema = makeSchema({
  types: [Query, Mutation, Post, User],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
});
