const fs = require('fs')
const EC = require('elliptic').ec
const ec = new EC('p256')
const { SHA3 } = require('sha3')

const fcl = require('@onflow/fcl')
const sdk = require('@onflow/sdk')
const { Identity } = require('@onflow/types')

const { generateCode, getAccount } = require('../utils')

require.extensions['.cdc'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const FungibleToken = require('../contracts/FungibleToken.cdc')

const APP_ACCT_ADDR = 'f8d6e0586b0a20c7'
const APP_ACCT_PK =
  '95a711a3dc58a6b60c87b7199a66ad691fff7d2c6722520fc83052fbb3e7348b'

const signWithKey = (privateKey, msgHex) => {
  const key = ec.keyFromPrivate(Buffer.from(privateKey, 'hex'))
  const sig = key.sign(hashMsgHex(msgHex))
  const n = 32 // half of signature length?
  const r = sig.r.toArrayLike(Buffer, 'be', n)
  const s = sig.s.toArrayLike(Buffer, 'be', n)
  return Buffer.concat([r, s]).toString('hex')
}

const hashMsgHex = msgHex => {
  const sha = new SHA3(256)
  sha.update(Buffer.from(msgHex, 'hex'))
  return sha.digest()
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

const deploy = async () => {
  const code = await generateCode(FungibleToken)
  return fcl.send(
    [
      sdk.transaction`
          transaction {
            prepare(acct: AuthAccount) {
              acct.setCode("${p => p.code}".decodeHex())
            }
          }
        `,
      fcl.params([
        fcl.param(Buffer.from(code, 'utf8').toString('hex'), Identity, 'code'),
      ]),
      fcl.proposer(authorization),
      fcl.payer(authorization),
      fcl.authorizations([authorization]),
      fcl.limit(100),
    ],
    {
      node: 'http://localhost:8080',
    },
  )
}

const run = async () => {
  const response = await deploy()
  console.log('response', response)
}

run()
