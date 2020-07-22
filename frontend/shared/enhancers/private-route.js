import React from "react";

const login = "/login?redirected=true";

const checkUserAuthentication = () => {
  //   return { auth: null }; // change null to { isAdmin: true } for test it.
  return false; // change null to { isAdmin: true } for test it.
};

export const withPrivateRoute = (Component, options = {}) => {
  const WithPrivateRoute = (props) => {
    return <Component {...props} />;
  };
  WithPrivateRoute.getInitialProps = async (ctx) => {
    console.log("XXXXX CRYSTAL CLEAR XXX", ctx.res);
    const res = ctx.res;
    const isAuthorized = await checkUserAuthentication();
    // console.log("XXX userAuth XXX", userAuth);
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
      console.log("AT THE COOL PART");
      let pageProps = {};
      pageProps = await Component.getInitialProps(ctx);
      return { ...pageProps };
    }

    // else if (Component.getInitialProps) {
    //   const wrappedProps = await Component.getInitialProps();
    //   return { ...wrappedProps };
    // }
    // res?.writeHead(302, {
    //   Location: login,
    // });
    // res?.end();
    // const req = ctx.ctx.req;
    // const md = req ? new MobileDetect(req.headers["user-agent"]) : null;
    // const isMobile = md ? (md.phone() ? true : false) : false;
    // let pageProps = {};
    // pageProps = await Component.getInitialProps(ctx);
    // return { ...pageProps, isMobile };
  };
  return WithPrivateRoute;
};
