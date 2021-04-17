import passport from "passport";
import prisma from "./prisma";
import { strategy } from "./passport-strategy";

passport.serializeUser((user, done) => {
  done(null, user.issuer);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { issuer: id },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(strategy);

export default passport;
