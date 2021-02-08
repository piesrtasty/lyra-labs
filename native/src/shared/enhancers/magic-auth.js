import React, { useState, useEffect } from "react";
import * as Keychain from "react-native-keychain";
import { Magic } from "@magic-sdk/react-native";

const MAGIC_PUBLISHABLE_KEY = "pk_test_789150F1861195B5";
const TEAM_ID = "KU5GP44363";
const KEYCHAIN_GROUP = "com.lyralabs.app";
const ACCESS_GROUP = `${TEAM_ID}.${KEYCHAIN_GROUP}`;
const MAGIC_AUTH_COOKIE_KEY = "magicAuthCookie";
const BACKEND_API_URL = "http://localhost:4000";

export const MagicAuthContext = React.createContext();

export const withMagicAuth = (Component) => {
  const WithMagicAuth = () => {
    const magic = new Magic(MAGIC_PUBLISHABLE_KEY);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
      const bootstrapAsync = async () => {
        setIsLoading(true);
        fetch(`${BACKEND_API_URL}/check-authentication`).then(({ status }) => {
          setIsLoggedIn(status == 200);
          setIsLoading(false);
        });
      };
      bootstrapAsync();
    }, []);

    const signIn = async ({ email, name, onSuccess, onError }) => {
      magic.auth
        .loginWithMagicLink({
          email,
        })
        .on("email-sent", () => {})
        .then(async (DIDToken) => {
          const resp = await fetch(`${BACKEND_API_URL}/login`, {
            headers: new Headers({
              Authorization: "Bearer " + DIDToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            }),
            withCredentials: true,
            credentials: "same-origin",
            method: "POST",
          });

          const json = await resp.json();

          setShowOnboarding(json.showOnboarding);

          const headers = resp.headers.map;
          const cookieHeader = headers["set-cookie"];
          if (cookieHeader) {
            await Keychain.setGenericPassword(
              MAGIC_AUTH_COOKIE_KEY,
              cookieHeader,
              [
                {
                  service: KEYCHAIN_GROUP,
                  accessGroup: ACCESS_GROUP,
                },
              ]
            );
          }
          setIsLoggedIn(true);
          if (onSuccess) {
            onSuccess();
          }
        })
        .once("email-not-deliverable", () => {})
        .catch((error) => {})
        .on("error", () => {
          if (onError) {
            onError();
          }
        });
    };

    const signOut = async () => {
      fetch(`${BACKEND_API_URL}/logout`, { method: "POST" }).then(
        ({ status }) => {
          setIsLoggedIn(!(status == 200));
          setIsLoading(false);
        }
      );
    };

    return (
      <MagicAuthContext.Provider
        value={{
          signIn,
          signOut,
          magic,
          isLoggedIn,
          isLoading,
          showOnboarding,
          setShowOnboarding,
        }}
      >
        <magic.Relayer />
        <Component />
      </MagicAuthContext.Provider>
    );
  };
  return WithMagicAuth;
};
