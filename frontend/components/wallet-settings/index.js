import React, { useState, useEffect } from "react";
import * as sdk from "@onflow/sdk";
import JSONPretty from "react-json-pretty";
import CoralButton from "@library/components/buttons/coral";
import MintButton from "@library/components/buttons/mint";
import GradientButton from "@library/components/buttons/gradient";
import checkReference from "../../flow/scripts/check-ref.cdc";
import checkCollection from "../../flow/scripts/check-collection.cdc";
import vaultBalance from "../../flow/scripts/vault-balance.cdc";
import getCollectionItems from "../../flow/scripts/get-collection-items.cdc";
import userVault from "../../flow/transactions/user-vault.cdc";
import setupNFTCollection from "../../flow/transactions/setup-nft-collection.cdc";
import styled from "@emotion/styled";
import * as fcl from "@onflow/fcl";
import { WHITE, LIGHT_CORAL, MAGIC_MINT } from "@style/colors";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderRadius: 3,
  backgroundColor: WHITE,
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
  padding: "1rem",
});

const WalletSettings = () => {
  const [walletUser, setWalletUser] = useState(null);
  const [vaultIsSetup, setVaultIsSetup] = useState(false);
  const [collectionIsSetup, setCollectionIsSetup] = useState(false);

  useEffect(
    () =>
      fcl.currentUser().subscribe(async (user) => {
        if (user.loggedIn) {
          setWalletUser(user);
          // Check if the wallet is set up yet
          const vaultStatus = await checkUserVaultStatus();
          setVaultIsSetup(vaultStatus);
          console.log("vaultIsSetup", vaultIsSetup);
          const collectionStatus = await checkUserCollectionStatus();
          setCollectionIsSetup(collectionStatus);
          console.log("collectionStatus", collectionStatus);
        } else {
          console.log("is not logged in");
        }
      }),
    []
  );

  const walletConnected = walletUser && walletUser.loggedIn;
  const walletNotConnected =
    walletUser === null || (walletUser && !walletUser.loggedIn);

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

  const getUserBalance = async () => {
    console.log("checking user balance");
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
    console.log("---------------");
    console.log("balance", balance);
    console.log("---------------");
  };

  const getUserCollection = async () => {
    console.log("calling getUserCollection");
    const user = fcl.currentUser();
    const snapshot = await user.snapshot();
    const address = getAddress(snapshot);
    const contractAddress = "0xf3fcd2c1a78f5eee";
    const scriptCode = await generateCode(getCollectionItems, {
      query: /(0x01|0x02)/g,
      "0x01": contractAddress,
      "0x02": address,
    });
    const script = sdk.script`${scriptCode}`;
    const response = await fcl.send([script]);
    const items = await fcl.decode(response);
    console.log("---------------");
    console.log("items", items);
    console.log("---------------");
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
      console.log("setupUserVault initResponse", initResponse);
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
    console.log("---- calling checkUserCollectionStatus ----");
    const user = fcl.currentUser();
    const snapshot = await user.snapshot();
    const address = getAddress(snapshot);
    const contractAddress = "0xf3fcd2c1a78f5eee";
    const scriptCode = await generateCode(checkCollection, {
      query: /(0x01|0x02)/g,
      "0x01": contractAddress,
      "0x02": address,
    });

    console.log("scriptCode", scriptCode);
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
    const contractAddress = "0xf3fcd2c1a78f5eee";
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
      console.log("setupNFTCollection initResponse", initResponse);
    } catch (e) {
      console.log("setupNFTCollection caught error", e);
    }
  };

  return (
    <Container>
      <div>
        {walletNotConnected && (
          <CoralButton onClick={fcl.authenticate}>Connect Wallet</CoralButton>
        )}
        <br />
        <br />
        {walletConnected && !vaultIsSetup && (
          <CoralButton onClick={setupUserVault}>Setup Vault</CoralButton>
        )}
        <br />
        <br />
        {walletConnected && !collectionIsSetup && (
          <CoralButton onClick={setupUserCollection}>
            Setup Collection
          </CoralButton>
        )}
        <br />
        <br />
        {walletConnected && vaultIsSetup && (
          <CoralButton onClick={getUserBalance}>Get User Balance</CoralButton>
        )}
        <br />
        <br />
        {walletConnected && collectionIsSetup && (
          <CoralButton onClick={getUserCollection}>
            Get User Collection
          </CoralButton>
        )}
        <br />
        <br />
        {walletConnected && (
          <div style={{ fontSize: 14 }}>
            <JSONPretty id="json-pretty" data={walletUser}></JSONPretty>
          </div>
        )}
      </div>
    </Container>
  );
};

export default WalletSettings;
