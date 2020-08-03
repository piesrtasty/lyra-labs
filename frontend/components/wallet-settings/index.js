import React, { useState, useEffect } from "react";
import * as sdk from "@onflow/sdk";
import JSONPretty from "react-json-pretty";
import CoralButton from "@library/components/buttons/coral";
import MintButton from "@library/components/buttons/mint";
import GradientButton from "@library/components/buttons/gradient";
import checkReference from "../../flow/scripts/check-ref.cdc";
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
  const [result, setResult] = useState(null);

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

  const walletSetup = false;

  const handleGetAccount = async () => {
    // console.log("calling handleGetAccount");
    const response = await sdk.send(
      await sdk.pipe(await sdk.build([sdk.getAccount("01cf0e2f2f715450")])),
      { node: "http://localhost:8080" }
    );
    console.log("--------------------------");
    console.log("------------------------response--", response);
    console.log("--------------------------");
    //   setResult(await sdk.decodeResponse(response))
  };

  const handleSetupAccount = () => {};

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

  const handleCheckRef = async () => {
    console.log("handleCheckRef");
    const user = fcl.currentUser();
    console.log("user", user);
    const snapshot = await user.snapshot();
    console.log("snapshot", snapshot);
    const address = getAddress(snapshot);
    console.log("address", address);

    const contractAddress = "0x01cf0e2f2f715450";

    const scriptCode = await generateCode(checkReference, {
      query: /(0x01|0x02)/g,
      "0x01": contractAddress,
      "0x02": address,
    });

    console.log("scriptCode", scriptCode);

    const script = sdk.script`${scriptCode}`;
    const response = await fcl.send([script]);
    console.log(response);
    const checkResult = await fcl.decode(response);
    console.log("checkResult", checkResult);
  };

  const runTestScript = async () => {
    const response = await fcl.send([
      fcl.script`
          pub fun main(): Int {
            return 42 + 6
          }
        `,
    ]);
    console.log("response", response);
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
        {walletConnected && !walletSetup && (
          <CoralButton onClick={fcl.authenticate}>Connect Wallet</CoralButton>
        )}
        <br />
        <br />
        <br />
        {walletConnected && !walletSetup && (
          <CoralButton onClick={handleCheckRef}>Check Reference</CoralButton>
        )}
        <br />
        <br />
        <br />
        {walletConnected && !walletSetup && (
          <CoralButton onClick={runTestScript}>Run Test Script</CoralButton>
        )}
        <br />
        <br />
        <br />
        {walletConnected && (
          <div style={{ fontSize: 14 }}>
            <JSONPretty id="json-pretty" data={walletUser}></JSONPretty>
          </div>
        )}
        {/* <GradientButton>{LABEL}</GradientButton> */}
      </div>
    </Container>
  );
};

export default WalletSettings;

{
  /* <div>
            <button onClick={handleGetAccount}>Get Account</button>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div> */
}
