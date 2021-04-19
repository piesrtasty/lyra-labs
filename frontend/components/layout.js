import Head from "next/head";
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import { Magic } from "magic-sdk";
import LoginModal from "@library/components/modals/login";
import { CURRENT_USER_QUERY } from "@data/queries";

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
export const CurrentUserContext = React.createContext({});

const Layout = ({ children }) => {
  const isProduction = process.env.NODE_ENV === "production";
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { loading, error, data, refetch } = useQuery(CURRENT_USER_QUERY, {});

  useEffect(() => {
    const bootstrapAsync = async () => {
      setIsLoading(true);
      // fetch(`${process.env.BACKEND_URL}/check-authentication`, {
      fetch(`/api/check-authentication`, {
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
        // const resp = await fetch(`${process.env.BACKEND_URL}/login`, {
        const resp = await fetch(`/api/login`, {
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
    fetch(`/api/logout`, {
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

  return (
    <LoginModalContext.Provider value={{ showLogin, hideLogin }}>
      <CurrentUserContext.Provider
        value={{ currentUser: data ? data.me : null, refetch }}
      >
        <MagicAuthContext.Provider
          value={{ signIn, signOut, isLoggedIn, isLoading }}
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
      </CurrentUserContext.Provider>
    </LoginModalContext.Provider>
  );
};

export default Layout;
