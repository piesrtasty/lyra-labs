const getUser = async (req, res, next, prisma) => {
  console.log('in getUSER middleware req.user', req.user)
  if (req.user) {
    const auth0id = req.user.sub
    const user = await prisma.user.findOne({ where: { auth0id } })
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
