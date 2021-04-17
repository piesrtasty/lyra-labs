import React, { useContext } from "react";
import { withPrivateRoute } from "@enhancers/private-route";
import Page from "@components/page";
import PostList from "@components/post-list";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";

const ReadingList = () => {
  return (
    <Page>
      <AuxiliaryPanelHeaderLarge>Reading List</AuxiliaryPanelHeaderLarge>
      <PostList />
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  // return {
  //   redirect: {
  //     destination: "/",
  //     permanent: false,
  //   },
  // };
}

export default ReadingList;
