import React from "react";
import Head from "next/head";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import fetch from "isomorphic-unfetch";

let apolloClient = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (typeof window === "undefined" || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx;
      const cookie = ctx.req.headers.cookie ? ctx.req.headers.cookie : null;
      // const md = ctx.req
      //   ? new MobileDetect(ctx.req.headers["user-agent"])
      //   : null;
      // console.log("md.mobile()", md.mobile());
      // const isMobile = md ? md.mobile() : false;
      // const isMobile = "Cool";
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient({}, cookie));
      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import(
              "@apollo/client/react/ssr"
            );
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        // isMobile,
        apolloState,
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState, cookie) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return createApolloClient(initialState, cookie);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, cookie);
  }

  return apolloClient;
}

const isBrowser = typeof window !== "undefined";

const httpLink = new HttpLink({
  // uri: `${process.env.BACKEND_URL}/graphql`,
  uri: `/api/graphql`,
  // uri: isBrowser
  //   ? "http://localhost:4000/graphql"
  //   : process.env.BACKEND_URL,
  // uri: "http://localhost:4000/graphql",
  // credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
  credentials: "include", // Additional fetch() options like `credentials` or `headers`
  // Use fetch() polyfill on the server
  fetch: !isBrowser && fetch,
  // fetchOptions: {
  //   mode: "no-cors"
  // }
});

// const setSessionLink = setContext((request, previousContext) => {
//   console.log("cooollooooooooo");
//   console.log("cooollooooooooo", request);
//   console.log("cooollooooooooo");
//   return { headers: { authorization: "1234" } };
// });

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}, cookie) {
  const setAuthLink = setContext((_, { headers }) => {
    const cookieObj = cookie ? { cookie } : {};
    return {
      headers: {
        ...headers,
        ...cookieObj,
      },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== "undefined";
  // const isDocker = process.env.BACKEND_URL === "http://backend:4000/graphql";
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    // link: concat(authMiddleware, httpLink),
    link: setAuthLink.concat(httpLink),
    // link: httpLink,
    cache: new InMemoryCache({
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
                console.log("Existing", existing);
                console.log("incoming", incoming);
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
    }).restore(initialState),
  });
}
