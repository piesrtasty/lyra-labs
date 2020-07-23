import React, { useContext } from "react";
import Page from "@components/page";
import PostList from "@components/post-list";
import { USER_POSTS_INBOX } from "@data/queries";
import { CurrentUserContext } from "@enhancers/current-user";
import { withCurrentUser } from "@enhancers/current-user";
import { withLoginModal } from "@enhancers/login-modal";
import { withPrivateRoute } from "@enhancers/private-route";
import { flowRight as compose } from "lodash";

const SettingsPage = ({ user }) => {
  const currentUser = useContext(CurrentUserContext);
  return <Page>COOL</Page>;
};

const enhance = compose(
  withPrivateRoute,
  withCurrentUser,
  withLoginModal,
  withPrivateRoute
);
export default enhance(SettingsPage);
