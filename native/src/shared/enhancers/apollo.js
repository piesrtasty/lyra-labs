import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import SplashScreen from "@screens/splash";

export const AuthContext = React.createContext({});

const createApolloClient = () => {
  // console.log("----------------------");
  // console.log("----------------------");
  // console.log("DIDToken", DIDToken);
  // console.log("----------------------");
  // console.log("----------------------");
  // const respA = await fetch(`http://localhost:4000/user/login`, {
  //   headers: new Headers({
  //     Authorization: "Bearer " + accessToken,
  //   }),
  //   withCredentials: true,
  //   credentials: "same-origin",
  //   method: "POST",
  // });
  // console.log("respA", respA);

  const link = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "same-origin",
    withCredentials: true,
    // headers: {},
    // headers: DIDToken
    //   ? {
    //       Authorization: `Bearer ${DIDToken}`,
    //     }
    //   : {},
  });
  // console.log("link in createApolloClient", link);
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    // link: logoutLink.concat(link),
    link,
    cache,
  });
  return client;
};

export const withApollo = (Component) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const [client, setClient] = useState(null);

    const fetchSession = async () => {
      // console.log("calling fetch session XXX");

      // const DIDToken = await AsyncStorage.getItem("DIDToken");
      // console.log("in the fetchSession call", DIDToken);
      const client = createApolloClient();
      setClient(client);
    };

    React.useEffect(() => {
      fetchSession();
    }, []);

    if (!client) {
      return <SplashScreen />;
    }

    return (
      <ApolloProvider client={client}>
        <AuthContext.Provider>
          <Component />
        </AuthContext.Provider>
      </ApolloProvider>
    );
  };
  return WithApollo;
};
