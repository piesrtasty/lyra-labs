import React from "react";
import App from "next/app";
import Layout from "../components/layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withMobile } from "../shared/enhancers/mobile-enhancer";

toast.configure();

class MyApp extends App {
  render(props) {
    const { Component, pageProps } = this.props;
    return (
      <div>TEST</div>
      // <Layout>
      //   <Component {...pageProps} />
      // </Layout>
    );
  }
}

export default withMobile(MyApp);
