const requireAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).end();
  } else {
    res.status(401).end();
  }
};

export default requireAuthenticated;
