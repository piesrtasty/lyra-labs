import passport from "passport";
import prisma from "./prisma";
import { strategy } from "./passport-strategy";

passport.serializeUser((user, done) => {
  console.log("--- calling passport.serializeUser -----", user);
  done(null, user.issuer);
});

passport.deserializeUser(async (id, done) => {
  console.log("------ calling deserializeUser--", id);
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
