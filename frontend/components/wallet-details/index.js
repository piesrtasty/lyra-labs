import React, { useEffect, useContext } from "react";
import styled from "@emotion/styled";

import * as fcl from "@onflow/fcl";

import { WHITE } from "@style/colors";

import { WalletContext } from "@enhancers/wallet-provider";
import CoralButton from "@library/components/buttons/coral";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderRadius: 3,
  backgroundColor: WHITE,
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
  padding: "1rem",
});

const WalletDetails = ({ currentUser }) => {
  const {
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
  } = useContext(WalletContext);

  useEffect(setupFCLAuthHandler, []);

  return (
    <Container>
      {currentUser &&
        currentUser.walletAddress &&
        currentUser.walletIsSetup && (
          <div>{`Current Associated Wallet Address: ${currentUser.walletAddress}`}</div>
        )}
      {walletConnected && walletUser && (
        <div>{`Active Wallet Address: ${walletUser.addr}`}</div>
      )}
      {walletConnected && vaultIsSetup && walletBalance && (
        <div>{`Balance: ${walletBalance} `}</div>
      )}
      {walletConnected && collectionIsSetup && walletCollection && (
        <div>{`Collection: ${JSON.stringify(walletCollection)}`}</div>
      )}
      {walletConnected &&
        walletUser &&
        walletUser.addr &&
        currentUser &&
        !currentUser.walletIsSetup &&
        !currentUser.walletAddress && (
          <div>
            <CoralButton onClick={connectActiveWalletToLyraLabs}>
              Connect Active Wallet to LyraLabs account
            </CoralButton>
          </div>
        )}
      <div>-------------------------------------</div>
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

        {/* {walletConnected && (
          <div style={{ fontSize: 14 }}>
            <JSONPretty id="json-pretty" data={walletUser}></JSONPretty>
          </div>
        )} */}
      </div>
    </Container>
  );
};

export default WalletDetails;
