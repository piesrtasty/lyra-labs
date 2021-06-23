import React from "react";
import Page from "@components/page";
import PostList from "@components/post-list";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";
import { initializeApollo, addApolloState } from "../lib/apollo-client";
import { ARCHIVED_POSTS, CURRENT_USER_QUERY } from "@data/queries";
import get from "lodash/get";
import { checkIfAuthenticated } from "../shared/utils";
import { POST_TYPE_ARCHIVED } from "@shared/constants/post-types";

const ArchivePage = () => {
  return (
    <Page>
      <PostList title="Archive" archived={true} postType={POST_TYPE_ARCHIVED} />
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
