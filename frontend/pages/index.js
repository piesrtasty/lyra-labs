import React, { useContext } from "react";
import Page from "@components/page";
import Feed from "@components/feed";
import { CurrentUserContext } from "@enhancers/current-user";
import { withCurrentUser } from "@enhancers/current-user";

import { flowRight as compose } from "lodash";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";
import { initializeApollo, addApolloState } from "../lib/apollo-client";
import { FEED_POSTS } from "@data/queries";

const IndexPage = () => {
  // const { currentUser } = useContext(CurrentUserContext);

  return (
    <Page>
      <AuxiliaryPanelHeaderLarge>Discovery Feed</AuxiliaryPanelHeaderLarge>
      <Feed currentUser={null} />
    </Page>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: FEED_POSTS,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default IndexPage;

// const enhance = compose(withCurrentUser, withLoginModal);
// export default enhance(IndexPage);
