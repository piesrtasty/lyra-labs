import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import { saveUrl } from "../../lib/utils";

const handler = nextConnect();

handler.use(auth).post(async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log("--- authHeader A ---", req.headers);
  if (req.isAuthenticated()) {
    const { givenUrl, title } = req.body;
    const currentUser = req.user;
    const response = await saveUrl(givenUrl, currentUser);
    console.log("AAAAAAAAA", req.body);
    console.log("resp", resp);
    console.log("A - currentUser", response);
    res.status(200).end();
  } else {
    console.log("BBBBBBB");
    res.status(401).end();
  }
});

export default handler;

// app.post("/save", async (req, res, done) => {
//   res.sendStatus(200);
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const DIDToken = authHeader.substring(7);
//     try {
//       magic.token.validate(DIDToken);
//       savePost();
//     } catch (err) {
//       res.status(401).send(err);
//     }
//   } else {
//     res.status(401).send("Missing auth header");
//   }
// });
