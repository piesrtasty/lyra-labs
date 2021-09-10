import React from "react";
import { ApolloProvider } from "@apollo/client";
import Layout from "../components/layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApollo } from "../lib/apollo-client";

import "tailwindcss/tailwind.css";
import "../styles.css";

import TagManager from "react-gtm-module";
const tagManagerArgs = {
  gtmId: "G-EHTCYM2RT4",
};

toast.configure();

const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);
  TagManager.initialize(tagManagerArgs);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default App;
