import React, { useState, useEffect } from "react";
import CoralButton from "@library/components/buttons/coral";
import MintButton from "@library/components/buttons/mint";
import GradientButton from "@library/components/buttons/gradient";
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

  useEffect(
    () =>
      fcl.currentUser().subscribe((user) => {
        console.log("user!", user);
        setWalletUser(user);
      }),
    []
  );

  const LABEL = "Connect Wallet";

  const walletConnected = walletUser && walletUser.loggedIn;
  const walletNotConnected =
    walletUser === null || (walletUser && !walletUser.loggedIn);

  // const walletSetup

  return (
    <Container>
      <div>
        {walletNotConnected && (
          <CoralButton onClick={fcl.authenticate}>{LABEL}</CoralButton>
        )}
        {walletConnected && <div>Wallet Connected</div>}

        {/* <GradientButton>{LABEL}</GradientButton> */}
      </div>
    </Container>
  );
};

export default WalletSettings;
