const getUser = async (req, res, next) => {
  if (req.user) {
    console.log('req', req)
    console.log('req.user', req.user)
    next()
  } else {
    // console.log('cookie on server')
    // console.log(req.headers)
    return next()
  }

  // if (!req.user) return next()
  // const user = await prisma.user({ auth0id: req.user.sub.split(`|`)[1] })
  // console.log('user', user)
  // req.user = { token: req.user, ...user }
  // next()
}

module.exports = { getUser }
