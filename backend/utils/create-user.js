const createUser = async ({ user, userMetadata, prisma }) => {
  console.log('in createUser user', user)
  console.log('in createUser user', user)
  console.log('in createUser user', user)
  console.log('in createUser userMetadata', userMetadata)
  // console.log('in createUser prisma', prisma)

  await prisma.user.create({
    data: {
      email: userMetadata.email,
      publicEthAddress: userMetadata.publicAddress,
      issuer: userMetadata.issuer,
      lastLoginAt: user.claim.iat,
    },
  })

  // const newUser = await prisma.user.create({
  //   data: {
  //     identity: userInfo.sub.split(`|`)[0],
  //     auth0id: userInfo.sub,
  //     name: userInfo.name ? userInfo.name : '',
  //     name_lower: userInfo.name ? userInfo.name.toLowerCase() : '',
  //     firstName: userInfo.given_name ? userInfo.given_name : '',
  //     lastName: userInfo.family_name ? userInfo.family_name : '',
  //     email: userInfo.email ? userInfo.email : '',
  //     avatar: userInfo.picture ? userInfo.picture : '',
  //     privateKey: 'def',
  //     username: userInfo.nickname ? userInfo.nickname : '',
  //     username_lower: userInfo.nickname ? userInfo.nickname.toLowerCase() : '',
  //     address: 'abc',
  //   },
  // })
  // return newUser
}

module.exports = { createUser }
