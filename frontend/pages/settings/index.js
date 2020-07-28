import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import JSONPretty from "react-json-pretty";
import Page from "@components/page";
import PostList from "@components/post-list";
import { USER_POSTS_INBOX } from "@data/queries";
import { CurrentUserContext } from "@enhancers/current-user";
import { withCurrentUser } from "@enhancers/current-user";
import { withLoginModal } from "@enhancers/login-modal";
import { withPrivateRoute } from "@enhancers/private-route";
import { flowRight as compose } from "lodash";
import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";
import * as types from "@onflow/types";

fcl
  .config()
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate");

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => fcl.currentUser().subscribe(setUser), []);

  if (user == null) return null;

  if (!user.loggedIn) return null;
  return (
    <div style={{ fontSize: 14 }}>
      <JSONPretty id="json-pretty" data={user}></JSONPretty>
      {/* {user.identity.avatar && <Img src={user.identity.avatar} />}
      <Name>{user.identity.name || "Anonymous"}</Name>
      <Button onClick={fcl.unauthenticate}>Sign Out</Button> */}
    </div>
  );
};

const executeSimpleScript = async (a, b) => {
  const response = await fcl.send([
    sdk.script`
        pub fun main(a: Int, b: Int):Int {
          return a + b
        }
      `,
    sdk.args([sdk.arg(a, types.Int), sdk.arg(b, types.Int)]),
  ]);

  return fcl.decode(response);
};

const simpleTransaction = async () => {
  const { authorization } = fcl.currentUser();
  const tx = await fcl.send([
    fcl.transaction`
      transaction {
        prepare(acct: AuthAccount) {
          log("Transaction Submitted")
        }
      }
    `,
    sdk.payer(authorization),
    sdk.proposer(authorization),
    sdk.authorizations([authorization]),
    sdk.limit(100),
  ]);

  console.log({ tx });

  fcl.tx(tx).subscribe((txStatus) => {
    if (fcl.tx.isExecuted(txStatus)) {
      console.log("Transaction was executed");
    }
  });
};

const deployHelloCadence = async () => {
  const code = `
    access(all) contract HelloWorld {
      access(all) let greeting: String

      init() {
          self.greeting = "Hello, Cadence!"
      }
  
      access(all) fun hello(): String {
          return self.greeting
      }
    }
  `;
  const { authorization } = fcl.currentUser();
  const tx = await fcl.send([
    sdk.transaction`
          transaction(code: String) {
            prepare(acct: AuthAccount) {
              acct.setCode(code.decodeHex())
            }
          }
        `,
    fcl.args([
      fcl.arg(Buffer.from(code, "utf8").toString("hex"), types.String),
    ]),
    fcl.proposer(authorization),
    fcl.payer(authorization),
    fcl.authorizations([authorization]),
    fcl.limit(100),
  ]);

  console.log({ tx });

  fcl.tx(tx).subscribe((txStatus) => {
    if (fcl.tx.isExecuted(txStatus)) {
      console.log("Contract was deployed", fcl.tx(tx));
    }
  });
};

const pingAccount = async () => {
  const { authorization } = fcl.currentUser();

  const tx = await fcl.send([
    fcl.transaction`
    import HelloWorld from 0x01cf0e2f2f715450

    transaction {
    
      prepare(acct: AuthAccount) {}
    
      execute {
        log(HelloWorld.hello())
      }
    }
  `,
    fcl.proposer(authorization),
    fcl.payer(authorization),
    fcl.authorizations([authorization]),
  ]);

  fcl.tx(tx).subscribe((txStatus) => {
    if (fcl.tx.isExecuted(txStatus)) {
      console.log("Transaction was executed");
    }
  });
};

const Column = styled("div")({
  width: 100,
  display: "flex",
  flexDirection: "column",
});

const printAuth = () => {
  const { authorization } = fcl.currentUser();
  console.log("authorization", authorization);
};

const printUser = () => {
  console.log("fcl.currentUser()", fcl.currentUser());
};

const SettingsPage = ({ user }) => {
  fcl.currentUser().subscribe((user) => {
    console.log("---------- user change -----------");
    console.log(user);
    console.log("--------------------------");
  });
  // const currentUser = useContext(CurrentUserContext);

  const [scriptResult, setScriptResult] = useState(null);

  const callScript = async () => {
    const result = await executeSimpleScript(10, 20);
    console.log("-------- result --------", result);

    // setScriptResult(result);
  };

  return (
    <Page>
      <button onClick={printAuth}>Print Auth</button>
      <br />
      <button onClick={printUser}>Print User</button>
      <UserProfile />
      <Column>
        <button onClick={() => fcl.authenticate()}>Connect Wallet</button>
        <br />
        <button onClick={deployHelloCadence}>Deploy Hello Contract</button>
        <br />
        <button onClick={pingAccount}>Ping for Hello</button>
      </Column>
      <button onClick={callScript}>Execute Script</button>
      {/* {scriptResult && (
        <div>
          <p className="script-result">Computation Result: {scriptResult}</p>
        </div>
      )}

      <button onClick={simpleTransaction}>Submit Tx</button>
      <button onClick={deployHelloCadence}>Deploy Hello Contract</button>
      <button onClick={pingAccount}>Ping for Hello</button> */}
      {/* <button>Deploy Con</button> */}
    </Page>
  );
};

const enhance = compose(
  withPrivateRoute,
  withCurrentUser,
  withLoginModal,
  withPrivateRoute
);
export default enhance(SettingsPage);
