const { LocalAddress, CryptoUtils } = require('loom-js')

const createUser = async ({ request: { user }, photon }) => {
  const bytes = CryptoUtils.generatePrivateKey()
  const privateKey = Buffer.from(
    bytes.buffer,
    bytes.byteOffset,
    bytes.byteLength,
  )
  const privateKeyStr = privateKey.toString('base64')
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
  const address = LocalAddress.fromPublicKey(publicKey).toString()

  const newUser = await photon.users.create({
    data: {
      identity: user.sub.split(`|`)[0],
      auth0id: user.sub,
      name: user.name,
      name_lower: user.name.toLowerCase(),
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
      avatar: user.picture,
      privateKey: privateKeyStr,
      username: user.nickname,
      username_lower: user.nickname.toLowerCase(),
      address,
    },
  })
  return newUser
}

module.exports = { createUser }
