import React from "react";
import App from "next/app";
import Layout from "../components/layout";
import { withMobile } from "../lib/mobile-enhancer";

class MyApp extends App {
  render(props) {
    const { Component, pageProps } = this.props;
    console.log("this.props", this.props);
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default withMobile(MyApp);
