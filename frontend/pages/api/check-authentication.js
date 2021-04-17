import nextConnect from "next-connect";
import requireAuthenticated from "../../middleware/require-authenticated";

const handler = nextConnect();

handler.use(requireAuthenticated);

export default handler;
