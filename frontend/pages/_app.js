import React from "react";
import App from "next/app";
// import Layout from "../components/layout";

class MyApp extends App {
  render(props) {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Component {...pageProps} />
      </div>
    );
  }
}

export default MyApp;
