import React from "react";
import auth0 from "./auth0";
import { withApollo } from "../lib/apollo";

export const CurrentUserContext = React.createContext({});

export const withCurrentUser = Component => {
  console.log("Component", Component);
  const WithCurrentUser = ({ user }) => {
    return <Component user={user} />;
  };

  WithCurrentUser.getInitialProps = async ({ req, res }) => {
    const session = await auth0.getSession(req);
    const user = session && session.user ? session.user : null;
    return { user };
  };

  return WithCurrentUser;
};
