import { makeSchema } from "nexus";
import { Query, Mutation, PostObjType, UserObjType } from "./resolvers";

export const schema = makeSchema({
  types: [Query, Mutation, PostObjType, UserObjType],
});
