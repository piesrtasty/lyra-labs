import auth0 from "../../lib/auth0";

export default async function me(req, res) {
  // console.log("-----------------");
  // console.log("COOOOOOOL");
  // const session = await auth0.getSession(req);
  // console.log("session", session);
  // console.log("-----------------");
  try {
    await auth0.handleProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
