import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

// import { setContext } from "@apollo/client/link/context";
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

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const link = new HttpLink({
    uri: `${BACKEND_API_URL}/api/graphql`,
    credentials: "same-origin",
    withCredentials: true,
    // headers: {},
    // headers: DIDToken
    //   ? {
    //       Authorization: `Bearer ${DIDToken}`,
    //     }
    //   : {},
  });

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          archivedPosts: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          savedPosts: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          feedPosts: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    link: errorLink.concat(link),
    // link,
    cache,
  });
  return client;
};

// onError: ({ networkError, graphQLErrors }) => {
//   console.log('graphQLErrors', graphQLErrors)
//   console.log('networkError', networkError)
// }

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
