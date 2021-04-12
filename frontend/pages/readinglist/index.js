import React, { useContext } from "react";
import { withPrivateRoute } from "@enhancers/private-route";
import Page from "@components/page";
import PostList from "@components/post-list";
import { withCurrentUser } from "@enhancers/current-user";
import { flowRight as compose } from "lodash";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";

const ReadingList = () => {
  return (
    <Page>
      <AuxiliaryPanelHeaderLarge>Reading List</AuxiliaryPanelHeaderLarge>
      <PostList />
    </Page>
  );
};

const enhance = compose(withPrivateRoute, withCurrentUser);
// const enhance = compose(withCurrentUser, withLoginModal);
export default enhance(ReadingList);
