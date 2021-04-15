import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
// import App from "next/app";
import Layout from "../components/layout";
import { withMagicAuth } from "@enhancers/magic-auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withMobile } from "../shared/enhancers/mobile-enhancer";
import { useApollo } from "../lib/apollo-client";

toast.configure();

import { Magic } from "magic-sdk";

const App = ({ Component, pageProps }) => {
  console.log("pageProps", pageProps);
  const apolloClient = useApollo(pageProps);

  // console.log("--- apolloClient", apolloClient);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default App;
