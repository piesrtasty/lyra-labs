import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import { saveUrl } from "../../lib/utils";

const handler = nextConnect();

handler.use(auth).post(async (req, res) => {
  if (req.isAuthenticated()) {
    const { givenUrl } = req.body;
    const currentUser = req.user;
    await saveUrl(givenUrl, currentUser);
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});

export default handler;
