import React from "react";
import { ApolloProvider } from "@apollo/client";
import Layout from "../components/layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApollo } from "../lib/apollo-client";

toast.configure();

const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default App;
