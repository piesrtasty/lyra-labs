const fs = require('fs')
const fcl = require('@onflow/fcl')
const sdk = require('@onflow/sdk')
const { Identity } = require('@onflow/types')

const { generateCode, authorization } = require('../../utils')

require.extensions['.cdc'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const FungibleToken = require('../../contracts/FungibleToken.cdc')

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
