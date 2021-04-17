import nextConnect from "next-connect";
import { Magic } from "@magic-sdk/admin";
import auth from "../../middleware/auth";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const handler = nextConnect();

handler.use(auth).post(async (req, res) => {
  if (req.isAuthenticated()) {
    await magic.users.logoutByIssuer(req.user.issuer);
    req.logout();
    return res.status(200).end();
  } else {
    return res.status(401).end(`User is not logged in.`);
  }
});

export default handler;
