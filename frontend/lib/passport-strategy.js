import { Strategy as MagicStrategy } from "passport-magic";
import { Magic } from "@magic-sdk/admin";
import prisma from "./prisma";
import { signup } from "./auth/signup";
import { login } from "./auth/login";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export const strategy = new MagicStrategy(async (user, done) => {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);
  const existingUser = await prisma.user.findUnique({
    where: { issuer: user.issuer },
  });
  if (!existingUser) {
    /* Create new user if doesn't exist */
    return signup(user, userMetadata, done);
  } else {
    /* Login user if otherwise */
    return login(user, done);
  }
});
