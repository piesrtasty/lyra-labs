import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import requireAuthenticated from "../../middleware/require-authenticated";

const handler = nextConnect();

handler.use(auth).use(requireAuthenticated);

export default handler;
