import Head from "next/head";
import React, { useState, useEffect } from "react";
import { withMagicAuth } from "@enhancers/magic-auth";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import { Magic } from "magic-sdk";
import LoginModal from "@library/components/modals/login";

const MAGIC_PUBLISHABLE_KEY = "pk_test_789150F1861195B5";
const THEME = {
  COLORS: {
    ALABASTER: "#f9fafa",
    RICE_CAKE: "#f3f3f3",
    LILAC: "#e8e8e8",
    WHITE: "#fff",
    BLACK: "#000",
  },
};

export const LoginModalContext = React.createContext({});
export const MagicAuthContext = React.createContext();

const Layout = ({ children }) => {
  console.log("--------------------->");
  console.log("---------x------------>");

  console.log("--------------------->");
  console.log("process.env.BACKEND_URL", process.env.BACKEND_URL);
  console.log("process.env.VERCEL_ENV", process.env.VERCEL_ENV);
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  console.log("--------------------->");
  console.log("--------------------->");
  console.log("--------------------->");

  const isProduction = process.env.NODE_ENV === "production";
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      setIsLoading(true);
      // fetch(`${process.env.BACKEND_URL}/check-authentication`, {
      fetch(`/check-authentication`, {
        withCredentials: true,
        credentials: "include",
        // credentials: "same-origin",
      }).then(({ status }) => {
        setIsLoggedIn(status == 200);
        setIsLoading(false);
      });
    };
    bootstrapAsync();
  }, []);

  const signIn = async (email, cb) => {
    const magic = new Magic(process.env.MAGIC_PUBLISHABLE_KEY);
    //   console.log("------ CALLING SIGN IN -----", email);
    magic.auth
      .loginWithMagicLink({
        email,
      })
      .on("email-sent", () => {
        console.log("email-sent");
      })
      .then(async (DIDToken) => {
        const resp = await fetch(`${process.env.BACKEND_URL}/login`, {
          headers: new Headers({
            Authorization: "Bearer " + DIDToken,
          }),
          withCredentials: true,
          // credentials: "same-origin",
          credentials: "include",
          method: "POST",
        });
        console.log("RESP", resp);
        if (cb) {
          cb();
        }
        setIsLoggedIn(true);
      })
      .once("email-not-deliverable", () => {
        console.log("email-not-deliverable");
      })
      .on("error", () => {
        setIsLoggedIn(false);
        console.log("Error");
      });
  };

  const signOut = async (cb) => {
    console.log("------ CALLING SIGN OUT -----");

    fetch(`${process.env.BACKEND_URL}/logout`, {
      method: "POST",
      credentials: "include",
    }).then(({ status }) => {
      setIsLoggedIn(!(status == 200));
      setIsLoading(false);
      if (cb) {
        cb();
      }
    });
  };

  const showLogin = () => setShowLoginModal(true);
  const hideLogin = () => setShowLoginModal(false);

  const testCookieAuth = async () => {
    console.log("TEST IT");
    const resp = await fetch(`${process.env.BACKEND_URL}/test-cookie-auth`, {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <LoginModalContext.Provider value={{ showLogin, hideLogin }}>
      <MagicAuthContext.Provider
        value={{ signIn, signOut, isLoggedIn, isLoading, testCookieAuth }}
      >
        <ThemeProvider theme={THEME}>
          <Head>
            <title>Lyra Labs 🥰</title>
            {isProduction && (
              <>
                <script
                  async
                  src="https://www.googletagmanager.com/gtag/js?id=G-EW50ZSVFBP"
                ></script>

                <script
                  dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-EW50ZSVFBP');
              `,
                  }}
                />
              </>
            )}
          </Head>
          <Global
            styles={css`
              body {
                font-size: 18px;
                background-color: ${THEME.COLORS.ALABASTER};
                margin: 0;
              }
              iframe {
                z-index: 2;
              }
            `}
          />
          <main>{children}</main>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          {showLoginModal && (
            <LoginModal onDismiss={() => setShowLoginModal(false)} />
          )}
        </ThemeProvider>
      </MagicAuthContext.Provider>
    </LoginModalContext.Provider>
  );
};

// export default withMagicAuth(Layout);
export default Layout;
