import prisma from "../prisma";

export const login = async (user, done) => {
  /* Replay attack protection (https://go.magic.link/replay-attack) */
  if (user.claim.iat <= user.lastLoginAt) {
    return done(null, false, {
      message: `Replay attack detected for user ${user.issuer}}.`,
    });
  }
  await prisma.user.update({
    where: { issuer: user.issuer },
    data: {
      publicEthAddress: user.publicAddress,
      lastLoginAt: user.claim.iat,
    },
  });
  return done(null, user);
};
