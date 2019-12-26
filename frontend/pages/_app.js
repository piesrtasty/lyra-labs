import React from "react";
import App from "next/app";
import Layout from "../components/layout";
import { withMobile } from "../shared/enhancers/mobile-enhancer";

class MyApp extends App {
  render(props) {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default withMobile(MyApp);
