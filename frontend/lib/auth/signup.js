import md5 from "md5";
import prisma from "../prisma";

export const signup = async (user, userMetadata, done) => {
  const email = userMetadata.email;
  const avatar = `https://gravatar.com/avatar/${md5(
    email.toLowerCase()
  )}?d=retro`;
  await prisma.user.create({
    data: {
      avatar,
      email,
      publicEthAddress: userMetadata.publicAddress,
      issuer: userMetadata.issuer,
      lastLoginAt: user.claim.iat,
    },
  });
  return done(null, user);
};
