const fcl = require('@onflow/fcl')
const EC = require('elliptic').ec
const ec = new EC('p256')
const { SHA3 } = require('sha3')

// const APP_ACCT_ADDR = 'f8d6e0586b0a20c7'
// const APP_ACCT_PK =
//   '95a711a3dc58a6b60c87b7199a66ad691fff7d2c6722520fc83052fbb3e7348b'

const APP_ACCT_ADDR = '01cf0e2f2f715450'
const APP_ACCT_PK =
  '322aaaee136b7b6a7c5bbbaac4414aeed44533dda36b46c0876405c1471bf0bb'

const generateCode = async (rawCode, match) => {
  if (!match) {
    return rawCode
  }
  const { query } = match
  return rawCode.replace(query, item => {
    return match[item]
  })
}

const getAccount = async addr => {
  const { account } = await fcl.send([fcl.getAccount(addr)])
  return account
}

const hashMsgHex = msgHex => {
  const sha = new SHA3(256)
  sha.update(Buffer.from(msgHex, 'hex'))
  return sha.digest()
}

const signWithKey = (privateKey, msgHex) => {
  const key = ec.keyFromPrivate(Buffer.from(privateKey, 'hex'))
  const sig = key.sign(hashMsgHex(msgHex))
  const n = 32 // half of signature length?
  const r = sig.r.toArrayLike(Buffer, 'be', n)
  const s = sig.s.toArrayLike(Buffer, 'be', n)
  return Buffer.concat([r, s]).toString('hex')
}

const authorization = async (account = {}) => {
  const user = await getAccount(APP_ACCT_ADDR)
  const key = user.keys[0]

  let sequenceNum
  if (account.role.proposer) sequenceNum = key.sequenceNumber

  const signingFunction = async data => {
    return {
      addr: user.address,
      keyId: key.index,
      signature: signWithKey(APP_ACCT_PK, data.message),
    }
  }

  return {
    ...account,
    addr: user.address,
    keyId: key.index,
    sequenceNum,
    signature: account.signature || null,
    signingFunction,
    resolve: null,
    roles: account.roles,
  }
}

exports.APP_ACCT_ADDR = APP_ACCT_ADDR
exports.generateCode = generateCode
exports.getAccount = getAccount
exports.authorization = authorization
