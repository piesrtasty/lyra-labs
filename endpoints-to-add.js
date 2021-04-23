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
