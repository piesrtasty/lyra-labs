import React, { useState, useEffect } from "react";
import * as sdk from "@onflow/sdk";
import JSONPretty from "react-json-pretty";
import CoralButton from "@library/components/buttons/coral";
import MintButton from "@library/components/buttons/mint";
import GradientButton from "@library/components/buttons/gradient";
import checkReference from "../../flow/scripts/check-ref.cdc";
import vaultBalance from "../../flow/scripts/vault-balance.cdc";
import userVault from "../../flow/transactions/user-vault.cdc";
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
  const [walletIsSetup, setWalletIsSetup] = useState(false);

  useEffect(
    () =>
      fcl.currentUser().subscribe(async (user) => {
        if (user.loggedIn) {
          setWalletUser(user);
          // Check if the wallet is set up yet
          const walletStatus = await checkUserWalletStatus();
          setWalletIsSetup(walletStatus);
          console.log("walletStatus", walletStatus);
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

  const checkUserBalance = async () => {
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

  const setupUserWallet = async () => {
    // Create the user vault
    const user = fcl.currentUser();
    const { authorization } = user;
    const snapshot = await user.snapshot();
    const address = getAddress(snapshot);
    const contractAddress = "0x01cf0e2f2f715450";
    const initCode = await generateCode(userVault, {
      query: /(0x01|0x02)/g,
      "0x01": contractAddress,
      "0x02": address,
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
      console.log("setupUserWallet initResponse", initResponse);
    } catch (e) {
      console.log("setupUserWallet caught error", e);
    }
  };

  const checkUserWalletStatus = async () => {
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

  return (
    <Container>
      <div>
        {walletNotConnected && (
          <CoralButton onClick={fcl.authenticate}>Connect Wallet</CoralButton>
        )}
        <br />
        <br />
        <br />
        {walletConnected && !walletIsSetup && (
          <CoralButton onClick={setupUserWallet}>Setup Wallet</CoralButton>
        )}
        <br />
        {walletConnected && walletIsSetup && (
          <CoralButton onClick={checkUserBalance}>
            Check User Balance
          </CoralButton>
        )}

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
