import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
const AUTH_COOKIE_PROP_NAME = "__AUTH_COOKIE__";

let apolloClient;

function createApolloClient(cookie = null) {
  console.log("-----inside of createApolloClient ---", cookie);
  console.log("typeof window === undefined", typeof window === "undefined");

  const setAuthLink = setContext((_, { headers }) => {
    // console.log("calling setAuthLink _ headers ->", headers);
    const cookieObj = cookie ? { cookie } : {};
    return {
      headers: {
        ...headers,
        ...cookieObj,
      },
    };
  });

  const httpLink = new HttpLink({
    //   uri: 'https://nextjs-graphql-with-prisma-simple.vercel.app/api', // Server URL (must be absolute)
    uri: "http://localhost:3000/api/graphql", // Server URL (must be absolute)
    // credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    credentials: "include", // Additional fetch() options like `credentials` or `headers`
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: setAuthLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            feedPosts: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null, cookie = null) {
  const _apolloClient = apolloClient ?? createApolloClient(cookie);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps, name) {
  // console.log("NAME", name);
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    pageProps.props.animal = "Doglet";
  }

  return pageProps;
}

export function useApollo(pageProps) {
  console.log(
    "------------ calling use Apollo --------- with pageProps",
    pageProps
  );
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const cookie = pageProps[AUTH_COOKIE_PROP_NAME];
  // console.log("pageProps in useApollo", pageProps);
  const store = useMemo(() => initializeApollo(state, cookie), [state]);
  return store;
}
