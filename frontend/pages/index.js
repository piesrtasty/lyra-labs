import React, { useContext } from "react";
import Page from "@components/page";
import Feed from "@components/feed";
import { CurrentUserContext } from "@enhancers/current-user";
import { withCurrentUser } from "@enhancers/current-user";
import { withLoginModal } from "@enhancers/login-modal";
import { flowRight as compose } from "lodash";
import { AuxiliaryPanelHeaderLarge } from "@library/components/typography/headers/auxiliary-panel";

const IndexPage = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Page>
      <AuxiliaryPanelHeaderLarge>Discovery Feed</AuxiliaryPanelHeaderLarge>
      <Feed currentUser={currentUser} />
    </Page>
  );
};

const enhance = compose(withCurrentUser, withLoginModal);
export default enhance(IndexPage);
