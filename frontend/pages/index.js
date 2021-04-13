import React, { useContext } from "react";
import Page from "@components/page";
import Feed from "@components/feed";
// import { CurrentUserContext } from "@enhancers/current-user";
import { CurrentUserContext } from "@components/layout";
import { withCurrentUser } from "@enhancers/current-user";
import { useQuery } from "@apollo/client";
import { flowRight as compose } from "lodash";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";
import { initializeApollo, addApolloState } from "../lib/apollo-client";
import { FEED_POSTS, CURRENT_USER_QUERY } from "@data/queries";
// import { CURRENT_USER_QUERY } from "../../data/queries";

const IndexPage = () => {
  const { currentUser } = useContext(CurrentUserContext);
  // const { loading, error, data, refetch } = useQuery(CURRENT_USER_QUERY, {});
  // if (loading) {
  //   return <div>{`loading: ${loading}`}</div>;
  // }
  // if (error) {
  //   return <div>{JSON.stringify(error)}</div>;
  // }

  return (
    <Page>
      <AuxiliaryPanelHeaderLarge>Discovery Feed</AuxiliaryPanelHeaderLarge>
      <Feed currentUser={currentUser} />
    </Page>
  );
};

export async function getServerSideProps(context) {
  console.log("SSR Context --->", context);
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: FEED_POSTS,
  });

  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
    // revalidate: 1,
  });
}

export default IndexPage;

// const enhance = compose(withCurrentUser, withLoginModal);
// export default enhance(IndexPage);
