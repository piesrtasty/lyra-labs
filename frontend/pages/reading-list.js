import React from "react";
import Page from "@components/page";
import PostList from "@components/post-list";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";
import { initializeApollo, addApolloState } from "../lib/apollo-client";
import { SAVED_POSTS, CURRENT_USER_QUERY } from "@data/queries";
import get from "lodash/get";
import { checkIfAuthenticated } from "../shared/utils";
import { POST_TYPE_SAVED } from "@shared/constants/post-types";

const ReadingList = (props) => {
  console.log("props", props);
  return (
    <Page>
      <PostList title="Reading List" postType={POST_TYPE_SAVED} />
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  console.log("------------------");
  console.log("Runnning getServerSideProos");
  const cookie = get(ctx, "req.headers.cookie", null);
  console.log("----------------- cookie -", cookie);
  console.log("------------------");
  const isAuthenticated = await checkIfAuthenticated(cookie);
  console.log("isAuthenticated", isAuthenticated);
  console.log("------------------");
  // console.log(">>>> GOT HERE <<<", isAuthenticated);
  if (isAuthenticated && cookie) {
    // console.log("ALSO HERE");
    const apolloClient = initializeApollo(null, cookie);
    await apolloClient.query({
      query: SAVED_POSTS,
      // variables: { take: 5 },
    });
    const user = await apolloClient.query({
      query: CURRENT_USER_QUERY,
    });
    console.log("user", user);
    return addApolloState(apolloClient, {
      props: { __AUTH_COOKIE__: cookie },
    });
  } else {
    // return {
    //   redirect: {
    //     destination: "/",
    //     permanent: false,
    //   },
    // };
  }
  return { props: {} };
}

export default ReadingList;
