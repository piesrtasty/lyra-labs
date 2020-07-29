const fs = require('fs')
const fcl = require('@onflow/fcl')
const sdk = require('@onflow/sdk')

require.extensions['.cdc'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const MainVaultTx = require('../../transactions/main-vault.cdc')

const { generateCode, authorization, APP_ACCT_ADDR } = require('../../utils')

const createMainVault = async () => {
  //   const code = await generateCode(MainVaultTx, {
  //     query: /(0x01|0x02)/g,
  //     '0x01': APP_ACCT_ADDR,
  //   })

  const code = await generateCode(MainVaultTx)

  return fcl.send(
    [
      sdk.transaction`${code}`,
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
  const response = await createMainVault()
  //   var response = await fcl.send([
  //     fcl.transaction`
  //         transaction {
  //           execute {
  //             log("Hello from execute")
  //           }
  //         }
  //       `,
  //     fcl.proposer(authorization),
  //     fcl.payer(authorization),
  //   ])

  var transaction = await fcl.tx(response).onceSealed()
  console.log(transaction)
  //   console.log('response', response)
}

run()
