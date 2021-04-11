import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
// import App from "next/app";
import Layout from "../components/layout";
import { withMagicAuth } from "@enhancers/magic-auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withMobile } from "../shared/enhancers/mobile-enhancer";
import { useApollo } from "../lib/apollo-client";

toast.configure();

import { Magic } from "magic-sdk";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

// class MyApp extends App {
//   render(props) {
//     const { Component, pageProps } = this.props;

//     // const [isLoggedIn, setIsLoggedIn] = useState(false);
//     // const [isLoading, setIsLoading] = useState(false);

//     // useEffect(() => {
//     //   const bootstrapAsync = async () => {
//     //     setIsLoading(true);
//     //     fetch(`${BACKEND_API_URL}/check-authentication`).then(({ status }) => {
//     //       setIsLoggedIn(status == 200);
//     //       setIsLoading(false);
//     //     });
//     //   };
//     //   bootstrapAsync();
//     // }, []);

//     return (
//       <Layout>
//         <div>
//           <h3>COOL</h3>
//         </div>
//         <Component {...pageProps} />
//       </Layout>
//     );
//   }
// }

// export default MyApp;
