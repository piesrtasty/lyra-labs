import React, { useState } from "react";

import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";

import { useMutation } from "@apollo/react-hooks";
import { ASSOCIATE_WALLET } from "@data/mutations";
import { toast } from "react-toastify";
import { CURRENT_USER_QUERY } from "../../data/queries";

import checkReference from "../../flow/scripts/check-ref.cdc";
import checkCollection from "../../flow/scripts/check-collection.cdc";
import checkActiveWalletScript from "../../flow/scripts/check-active-wallet.cdc";
import vaultBalance from "../../flow/scripts/vault-balance.cdc";
import getCollectionItems from "../../flow/scripts/get-collection-items.cdc";
import userVault from "../../flow/transactions/user-vault.cdc";
import setupNFTCollection from "../../flow/transactions/setup-nft-collection.cdc";
import giveNFTAward from "../../flow/transactions/give-nft-award.cdc";

export const WalletContext = React.createContext({});

fcl
  .config()
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate");

const getAddress = (user, nullPrefix = true) => {
  return nullPrefix ? `0x${user.addr}` : user.addr;
};

const generateCode = async (rawCode, match) => {
  if (!match) {
    return rawCode;
  }
  const { query } = match;
  return rawCode.replace(query, (item) => {
    return match[item];
  });
};

export const withWallet = (Component) => {
  const WithWallet = () => {
    const [walletUser, setWalletUser] = useState(null);
    const [vaultIsSetup, setVaultIsSetup] = useState(false);
    const [collectionIsSetup, setCollectionIsSetup] = useState(false);
    const [walletBalance, setWalletBalance] = useState(null);
    const [walletCollection, setWalletCollection] = useState(null);

    const walletConnected = walletUser && walletUser.loggedIn;
    const walletNotConnected =
      walletUser === null || (walletUser && !walletUser.loggedIn);

    const setupFCLAuthHandler = () => {
      fcl.currentUser().subscribe(async (user) => {
        if (user.loggedIn) {
          setWalletUser(user);
          // Check if the wallet is set up yet
          const vaultStatus = await checkUserVaultStatus();
          setVaultIsSetup(vaultStatus);
          if (vaultStatus) {
            startBalancePoll();
          }
          const collectionStatus = await checkUserCollectionStatus();
          setCollectionIsSetup(collectionStatus);
          if (collectionStatus) {
            getUserCollection();
          }
        } else {
          console.log("is not logged in");
        }
      });
    };

    let pollId = null;
    const startBalancePoll = async () => {
      const balance = await getUserBalance();
      setWalletBalance(balance);
      pollId = setTimeout(startBalancePoll, 2000);
    };

    const getUserBalance = async () => {
      const user = fcl.currentUser();
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      const contractAddress = "0x01cf0e2f2f715450";
      const scriptCode = await generateCode(vaultBalance, {
        query: /(0x01|0x02)/g,
        "0x01": contractAddress,
        "0x02": address,
      });
      const script = sdk.script`${scriptCode}`;
      const response = await fcl.send([script]);
      const balance = await fcl.decode(response);
      return balance;
    };

    const getUserCollection = async () => {
      const user = fcl.currentUser();
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      //   const contractAddress = "0xf3fcd2c1a78f5eee";
      const contractAddress = "0xfd43f9148d4b725d";
      const scriptCode = await generateCode(getCollectionItems, {
        query: /(0x01|0x02)/g,
        "0x01": contractAddress,
        "0x02": address,
      });
      const script = sdk.script`${scriptCode}`;
      const response = await fcl.send([script]);
      const items = await fcl.decode(response);
      setWalletCollection(items);
    };

    const setupUserVault = async () => {
      // Create the user vault
      const user = fcl.currentUser();
      const { authorization } = user;
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      const contractAddress = "0x01cf0e2f2f715450";
      const initCode = await generateCode(userVault, {
        query: /(0x01)/g,
        "0x01": contractAddress,
      });
      try {
        const initResponse = await fcl.send(
          [
            sdk.transaction`${initCode}`,
            fcl.proposer(authorization),
            fcl.payer(authorization),
            fcl.authorizations([authorization]),
            fcl.limit(100),
          ],
          {
            node: "http://localhost:8080",
          }
        );
      } catch (e) {
        console.log("setupUserVault caught error", e);
      }
    };

    const checkUserVaultStatus = async () => {
      const user = fcl.currentUser();
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      const contractAddress = "0x01cf0e2f2f715450";
      const scriptCode = await generateCode(checkReference, {
        query: /(0x01|0x02)/g,
        "0x01": contractAddress,
        "0x02": address,
      });
      const script = sdk.script`${scriptCode}`;
      const response = await fcl.send([script]);
      const checkResult = await fcl.decode(response);
      return checkResult;
    };

    const checkUserCollectionStatus = async () => {
      const user = fcl.currentUser();
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      //   const contractAddress = "0xf3fcd2c1a78f5eee";
      const contractAddress = "0xfd43f9148d4b725d";
      const scriptCode = await generateCode(checkCollection, {
        query: /(0x01|0x02)/g,
        "0x01": contractAddress,
        "0x02": address,
      });

      const script = sdk.script`${scriptCode}`;
      const response = await fcl.send([script]);
      const checkResult = await fcl.decode(response);
      return checkResult;
    };

    const setupUserCollection = async () => {
      // Create the user vault
      const user = fcl.currentUser();
      const { authorization } = user;
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      // const contractAddress = "0xf3fcd2c1a78f5eee";
      const contractAddress = "0xfd43f9148d4b725d";
      const initCode = await generateCode(setupNFTCollection, {
        query: /(0x01)/g,
        "0x01": contractAddress,
      });
      try {
        const initResponse = await fcl.send(
          [
            sdk.transaction`${initCode}`,
            fcl.proposer(authorization),
            fcl.payer(authorization),
            fcl.authorizations([authorization]),
            fcl.limit(100),
          ],
          {
            node: "http://localhost:8080",
          }
        );
      } catch (e) {
        console.log("setupNFTCollection caught error", e);
      }
    };

    const checkActiveWallet = async () => {
      // Checks if the active wallet is setup
      const user = fcl.currentUser();
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      const scriptCode = await generateCode(checkActiveWalletScript, {
        query: /(0x01|0x02|0x03)/g,
        "0x01": `0x${FUNGIBLE_TOKEN_CONTRACT_ADDRESS}`,
        "0x02": `0x${NON_FUNGIBLE_TOKEN_CONTRACT_ADDRESS}`,
        "0x03": address,
      });
      const script = sdk.script`${scriptCode}`;
      const response = await fcl.send([script]);
      const activeWalletStatus = await fcl.decode(response);
      return activeWalletStatus;
    };

    const setupActiveWallet = async () => {
      // Creates a vault and collection in the active wallet
    };

    const giveAward = async ({ recipientAddress }) => {
      console.log("giving award to recipientAddress", recipientAddress);
      // Create the user vault
      const user = fcl.currentUser();
      const { authorization } = user;
      const snapshot = await user.snapshot();
      const address = getAddress(snapshot);
      // const contractAddress = "0xf3fcd2c1a78f5eee";
      const fungibleTokenContractAddress = "0x01cf0e2f2f715450";
      const awardContractAddress = "0xfd43f9148d4b725d";
      const initCode = await generateCode(giveNFTAward, {
        query: /(0x01|0x02|0x03)/g,
        "0x01": awardContractAddress,
        "0x02": fungibleTokenContractAddress,
        "0x03": `0x${recipientAddress}`,
      });
      try {
        const initResponse = await fcl.send(
          [
            sdk.transaction`${initCode}`,
            fcl.proposer(authorization),
            fcl.payer(authorization),
            fcl.authorizations([authorization]),
            fcl.limit(100),
          ],
          {
            node: "http://localhost:8080",
          }
        );
        console.log("give award initResponse", initResponse);
      } catch (e) {
        console.log("give award caught error", e);
      }
    };

    const [associateWallet, { data, loading, error }] = useMutation(
      ASSOCIATE_WALLET,
      {
        update: (cache, { data }) => {
          const { me: currentUserData } = cache.readQuery({
            query: CURRENT_USER_QUERY,
          });
          cache.writeQuery({
            query: CURRENT_USER_QUERY,
            data: { me: { ...currentUserData, ...data.associateWallet } },
          });
        },
        onError: () => {
          toast.error("😳Ekkk! Failed to associate wallet.", {
            position: "bottom-left",
          });
        },
      }
    );

    const connectActiveWalletToLyraLabs = async () => {
      associateWallet({
        variables: {
          address: walletUser.addr,
        },
      });
    };

    return (
      <WalletContext.Provider
        value={{
          walletConnected,
          walletNotConnected,
          setupFCLAuthHandler,
          walletUser,
          setupUserVault,
          vaultIsSetup,
          setupUserCollection,
          collectionIsSetup,
          walletBalance,
          walletCollection,
          connectActiveWalletToLyraLabs,
          giveAward,
        }}
      >
        <Component />
      </WalletContext.Provider>
    );
  };
  return WithWallet;
};
