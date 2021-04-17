const requireAuthenticated = (req, res, next) => {
  console.log("--- in requireAuthenticated ---");
  if (req.isAuthenticated()) {
    console.log("YES - is authenciated");
    next();
  } else {
    console.log("NO - is not authenciated");
    res.sendStatus(401);
  }
};

export default requireAuthenticated;
