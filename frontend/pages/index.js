import React, { useContext } from "react";
import styled from "@emotion/styled";
import Page from "@components/page";
import Feed from "@components/feed";
import { LAPTOP } from "../shared/style/breakpoints";
import { CurrentUserContext } from "@enhancers/current-user";
import { withCurrentUser } from "@enhancers/current-user";
import { withMagicAuth } from "@enhancers/magic-auth";
// import { withWallet } from "@enhancers/wallet-provider";
import { Magic } from "magic-sdk";
import { withLoginModal } from "@enhancers/login-modal";
import { flowRight as compose } from "lodash";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";

const IndexPage = () => {
  const currentUser = useContext(CurrentUserContext);

  const handleLogin = async (e) => {
    const magic = new Magic("pk_test_789150F1861195B5");
    // const email = new FormData(e.target).get("email");
    const email = "lukehamiltonmail@gmail.com";
    const didToken = await magic.auth.loginWithMagicLink({ email });
    await fetch(`http://localhost:4000/login`, {
      headers: new Headers({
        Authorization: "Bearer " + didToken,
      }),
      withCredentials: true,
      credentials: "include",
      method: "POST",
    });
    // render();
  };

  const handleSetup = async () => {
    console.log("handle setup");
    await fetch(`http://localhost:4000/buy-apple`, {
      method: "POST",
      credentials: "include",
    });
  };

  // let res = await fetch(`${serverUrl}user/`);
  // if (res.status == 200) {
  //   let userData = await res.json();
  //   let appleCount = userData.appleCount;
  //   let appleDisplay =
  //     appleCount > 0 ? "🍎".repeat(appleCount) : "You have no apples...";
  // }

  const handlePrintCurrentUser = () => {
    console.log("printing currnt user -> ", currentUser);
  };

  return (
    <Page>
      <AuxiliaryPanelHeaderLarge>Discovery Feed</AuxiliaryPanelHeaderLarge>
      {/* <Feed currentUser={currentUser} /> */}
      <button onClick={handlePrintCurrentUser}>print current user</button>
      {/* <button onClick={handleSetup}>setup</button> */}
      {/* <button onClick={handleLogin}>login</button> */}
    </Page>
  );
};

const enhance = compose(withCurrentUser, withLoginModal);
export default enhance(IndexPage);
