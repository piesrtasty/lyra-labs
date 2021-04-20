// app.post("/validate-token", async (req, res, done) => {
//   console.log("Hit the validate token endpoint");
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const DIDToken = authHeader.substring(7);
//     const tokenIsValid = validateToken(DIDToken);
//     console.log(" >>>> tokenIsValid", tokenIsValid);
//     res.status(200).json({ name: "LUKE", tokenIsValid });
//   } else {
//     res.status(401).json({ err: "Missing auth header" });
//   }
// });

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
