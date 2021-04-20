import nextConnect from "next-connect";
import cookieParser from "cookie-parser";
import passport from "../lib/passport";
import session from "../lib/session";

const auth = nextConnect()
  .use(cookieParser())
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default auth;
