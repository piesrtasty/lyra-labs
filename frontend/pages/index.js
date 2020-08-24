import React, { useContext } from "react";
import Page from "@components/page";
import Feed from "@components/feed";
import WalletDetails from "@components/wallet-details";
import { USER_POSTS_INBOX } from "@data/queries";
import { CurrentUserContext } from "@enhancers/current-user";
import { withCurrentUser } from "@enhancers/current-user";
import { withWallet } from "@enhancers/wallet-provider";
import { withLoginModal } from "@enhancers/login-modal";
import { flowRight as compose } from "lodash";

const IndexPage = ({ user }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <Page>
      {currentUser && <WalletDetails currentUser={currentUser} />}
      <Feed currentUser={currentUser} />
    </Page>
  );
};

const enhance = compose(withCurrentUser, withLoginModal, withWallet);
export default enhance(IndexPage);
