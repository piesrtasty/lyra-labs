import Head from "next/head";
import React, { useState, useEffect } from "react";
import { withMagicAuth } from "@enhancers/magic-auth";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import { Magic } from "magic-sdk";
const BACKEND_API_URL = "http://localhost:4000";

const MAGIC_PUBLISHABLE_KEY = "pk_test_789150F1861195B5";
const MAGIC_AUTH_COOKIE_KEY = "magicAuthCookie";
const THEME = {
  COLORS: {
    ALABASTER: "#f9fafa",
    RICE_CAKE: "#f3f3f3",
    LILAC: "#e8e8e8",
    WHITE: "#fff",
    BLACK: "#000",
  },
};

export const MagicAuthContext = React.createContext();

const Layout = ({ children }) => {
  const isProduction = process.env.NODE_ENV === "production";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      setIsLoading(true);
      fetch(`${BACKEND_API_URL}/check-authentication`, {
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
    const magic = new Magic(MAGIC_PUBLISHABLE_KEY);
    //   console.log("------ CALLING SIGN IN -----", email);
    magic.auth
      .loginWithMagicLink({
        email,
      })
      .on("email-sent", () => {
        console.log("email-sent");
      })
      .then(async (DIDToken) => {
        // const resp = await fetch(`${BACKEND_API_URL}/user/login`, {
        const resp = await fetch(`http://localhost:4000/login`, {
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

    fetch(`${BACKEND_API_URL}/logout`, {
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

  const testCookieAuth = async () => {
    console.log("TEST IT");
    const resp = await fetch(`http://localhost:4000/test-cookie-auth`, {
      method: "POST",
      credentials: "include",
    });
  };

  return (
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
      </ThemeProvider>
    </MagicAuthContext.Provider>
  );
};

// export default withMagicAuth(Layout);
export default Layout;
