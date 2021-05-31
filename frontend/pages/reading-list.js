import React from "react";
import Page from "@components/page";
import PostList from "@components/post-list";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";
import { initializeApollo, addApolloState } from "../lib/apollo-client";
import { SAVED_POSTS, CURRENT_USER_QUERY } from "@data/queries";
import get from "lodash/get";
import { checkIfAuthenticated } from "../shared/utils";
import { POST_TYPE_SAVED } from "../components/post-card";

const ReadingList = () => {
  return (
    <Page>
      <PostList title="Reading List" postType={POST_TYPE_SAVED} />
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = get(ctx, "req.headers.cookie", null);
  const isAuthenticated = checkIfAuthenticated();
  // console.log(">>>> GOT HERE <<<", isAuthenticated);
  if (isAuthenticated && cookie) {
    // console.log("ALSO HERE");
    const apolloClient = initializeApollo(null, cookie);
    await apolloClient.query({
      query: SAVED_POSTS,
      // variables: { take: 5 },
    });
    await apolloClient.query({
      query: CURRENT_USER_QUERY,
    });
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
