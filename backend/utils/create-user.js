const { LocalAddress, CryptoUtils } = require('loom-js')

const createUser = async ({ request: { user }, prisma }) => {
  const { token } = user
  const bytes = CryptoUtils.generatePrivateKey()
  const privateKey = Buffer.from(
    bytes.buffer,
    bytes.byteOffset,
    bytes.byteLength,
  )
  const privateKeyStr = privateKey.toString('base64')
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
  const address = LocalAddress.fromPublicKey(publicKey).toString()

  const newUser = await prisma.user.create({
    data: {
      identity: token.sub.split(`|`)[0],
      auth0id: token.sub,
      name: token.name,
      name_lower: token.name.toLowerCase(),
      firstName: token.given_name ? token.given_name : '',
      lastName: token.family_name ? token.family_name : '',
      email: token.email ? token.email : '',
      avatar: token.picture,
      privateKey: privateKeyStr,
      username: token.nickname ? token.nickname : '',
      username_lower: token.nickname.toLowerCase(),
      address,
    },
  })
  return newUser
}

module.exports = { createUser }
