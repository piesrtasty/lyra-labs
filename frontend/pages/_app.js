import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import App from "next/app";
import Layout from "../components/layout";
import { withMagicAuth } from "@enhancers/magic-auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withMobile } from "../shared/enhancers/mobile-enhancer";
import flowConfig from "@config/flow";

const { ACCESS_NODE_API, CHALLENGE_HANDSHAKE } = flowConfig;

toast.configure();

fcl
  .config()
  .put("accessNode.api", ACCESS_NODE_API)
  .put("challenge.handshake", CHALLENGE_HANDSHAKE);

import { Magic } from "magic-sdk";

const MAGIC_PUBLISHABLE_KEY = "pk_test_789150F1861195B5";
const BACKEND_API_URL = "http://localhost:4000";
class MyApp extends App {
  render(props) {
    const { Component, pageProps } = this.props;

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //   const bootstrapAsync = async () => {
    //     setIsLoading(true);
    //     fetch(`${BACKEND_API_URL}/check-authentication`).then(({ status }) => {
    //       setIsLoggedIn(status == 200);
    //       setIsLoading(false);
    //     });
    //   };
    //   bootstrapAsync();
    // }, []);

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default withMobile(MyApp);
