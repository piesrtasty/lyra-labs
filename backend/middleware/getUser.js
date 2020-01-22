const getUser = async (req, res, next, photon) => {
  if (req.user) {
    const auth0id = req.user.sub
    const user = await photon.users.findOne({ where: { auth0id } })
    if (!user) {
      req.user = { token: req.user }
    } else {
      req.user = user
    }
    next()
  } else {
    return next()
  }
}

module.exports = { getUser }
