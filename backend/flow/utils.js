const fcl = require('@onflow/fcl')

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

exports.generateCode = generateCode
exports.getAccount = getAccount
