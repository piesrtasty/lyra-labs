import React from "react";
import Router from "next/router";

const login = "/";

export const withPrivateRoute = (Component, options = {}) => {
  const WithPrivateRoute = (props) => {
    return <Component {...props} />;
  };
  WithPrivateRoute.getInitialProps = async (ctx) => {
    const { req, res } = ctx;
    const cookie =
      req && req.headers && req.headers.cookie ? req.headers.cookie : null;
    const cookieObj = cookie ? { cookie } : {};
    const resp = await fetch(`http://localhost:4000/check-authentication`, {
      withCredentials: true,
      credentials: "include",
      headers: {
        ...cookieObj,
      },
    });
    const isAuthorized = resp.status === 200;
    if (!isAuthorized) {
      // Handle server-side and client-side rendering.
      if (res) {
        res?.writeHead(302, {
          Location: login,
        });
        res?.end();
      } else {
        Router.replace(login);
      }
    } else {
      let pageProps = {};
      pageProps = Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {};
      return { ...pageProps };
    }
  };
  return WithPrivateRoute;
};
