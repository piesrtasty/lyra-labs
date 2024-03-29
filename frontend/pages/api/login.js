import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import passport from "../../lib/passport";
import prisma from "../../lib/prisma";

const handler = nextConnect();

handler.use(auth).post(passport.authenticate("magic"), async (req, res) => {
  if (req.user) {
    const user = await prisma.user.findUnique({
      where: { issuer: req.user.issuer },
    });
    const name = req.body && req.body.name ? req.body.name : null;
    // If a name is passed in and user doesn't have one set assume it's a signup
    if (name && !user.name) {
      await prisma.user.update({
        where: { issuer: req.user.issuer },
        data: {
          name,
        },
      });
    }
    res.json({ showOnboarding: user.showOnboarding });
  } else {
    return res.status(401).end("Could not log user in.");
  }
});

export default handler;
