import React, { useContext } from "react";
import Page from "@components/page";
import Feed from "@components/feed";
import { CurrentUserContext } from "@components/layout";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";
import { initializeApollo, addApolloState } from "../lib/apollo-client";
import { FEED_POSTS, CURRENT_USER_QUERY } from "@data/queries";

const IndexPage = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Page>
      <AuxiliaryPanelHeaderLarge>Discovery Feed!</AuxiliaryPanelHeaderLarge>
      <Feed currentUser={currentUser} />
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.headers.cookie ? ctx.req.headers.cookie : null;
  const apolloClient = initializeApollo(null, cookie);

  await apolloClient.query({
    query: FEED_POSTS,
  });

  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });

  return addApolloState(apolloClient, {
    props: { __AUTH_COOKIE__: cookie },
  });
}

export default IndexPage;
