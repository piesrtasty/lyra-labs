// import { nexusPrisma } from "nexus-plugin-prisma";
import { makeSchema } from "nexus";
import { Query, Mutation, PostObjType, UserObjType } from "./resolvers";

export const schema = makeSchema({
  types: [Query, Mutation, PostObjType, UserObjType],
  // plugins: [nexusPrisma({ experimentalCRUD: true })],
});
