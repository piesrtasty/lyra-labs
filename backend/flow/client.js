const fs = require('fs')
const fcl = require('@onflow/fcl')
const sdk = require('@onflow/sdk')

require.extensions['.cdc'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const FLOW_NODE = 'http://localhost:8080'

const { FUNGIBLE_TOKEN_CONTRACT_ACCT } = require('../../flow-accounts')

const MintTokensTx = require('./transactions/fungible-token/mint-tokens.cdc')

const { generateCode, createAuthorization } = require('./utils')

class FlowClient {
  constructor() {}

  mintAndSendTokens = async ({ quantity, address }) => {
    const authorization = await createAuthorization({
      address: FUNGIBLE_TOKEN_CONTRACT_ACCT.address,
      privateKey: FUNGIBLE_TOKEN_CONTRACT_ACCT.privateKey,
    })
    const code = await generateCode(MintTokensTx, {
      query: /(0x01|0x02|AMOUNT)/g,
      '0x01': `0x${FUNGIBLE_TOKEN_CONTRACT_ACCT.address}`,
      // recipient of tokens (in this case the Fungible Token Contract as it's the main holder)
      '0x02': `0x${address}`,
      AMOUNT: quantity,
    })
    return fcl.send(
      [
        sdk.transaction`${code}`,
        fcl.proposer(authorization),
        fcl.payer(authorization),
        fcl.authorizations([authorization]),
        fcl.limit(100),
      ],
      {
        node: FLOW_NODE,
      },
    )
  }
}

module.exports = new FlowClient()
