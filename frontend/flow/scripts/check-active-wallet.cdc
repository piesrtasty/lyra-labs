import FungibleToken from 0x01
import NonFungibleToken from 0x02

pub fun main():Bool {
    let activeWalletAccount = getAccount(0x03)
    let fungibleTokenCapability = activeWalletAccount.getCapability(/public/MainReceiver)
    let fungibleTokenCapabilityActive = fungibleTokenCapability!.check<&FungibleToken.Vault{FungibleToken.Receiver}>()
    // let capability = accountToCheck.getCapability(/public/NFTReceiver)
    // log("-----------------------")
    // log(capability)
    // log("-----------------------")
    // // let checkResult = capability!.check<&NonFungibleToken.Collection{NonFungibleToken.NFTReceiver}>()
    // let checkResult = capability!.check<&{NonFungibleToken.NFTReceiver}>()
    // // let receiverRef = capability!.check<&{NonFungibleToken.NFTReceiver}>()
    // return checkResult
}