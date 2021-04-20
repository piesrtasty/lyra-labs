import React from "react";
import Page from "@components/page";
import PostList from "@components/post-list";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";
import { initializeApollo, addApolloState } from "../lib/apollo-client";
import { ARCHIVED_POSTS, CURRENT_USER_QUERY } from "@data/queries";
import get from "lodash/get";
import { checkIfAuthenticated } from "../shared/utils";

const ArchivePage = () => {
  return (
    <Page>
      <AuxiliaryPanelHeaderLarge>Archive</AuxiliaryPanelHeaderLarge>
      <PostList archived={true} />
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = get(ctx, "req.headers.cookie", null);
  const isAuthenticated = checkIfAuthenticated();
  if (isAuthenticated && cookie) {
    const apolloClient = initializeApollo(null, cookie);
    await apolloClient.query({
      query: ARCHIVED_POSTS,
      variables: { take: 100 },
    });
    await apolloClient.query({
      query: CURRENT_USER_QUERY,
    });
    return addApolloState(apolloClient, {
      props: { __AUTH_COOKIE__: cookie },
    });
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default ArchivePage;
