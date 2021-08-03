import React, { useState, useEffect } from "react";
import * as Keychain from "react-native-keychain";
import { Magic } from "@magic-sdk/react-native";
import Config from "react-native-config";

const {
  MAGIC_PUBLISHABLE_KEY,
  TEAM_ID,
  KEYCHAIN_GROUP,
  MAGIC_AUTH_COOKIE_KEY,
  BACKEND_API_URL,
} = Config;
const ACCESS_GROUP = `${TEAM_ID}.${KEYCHAIN_GROUP}`;

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
        fetch(`${BACKEND_API_URL}/api/check-authentication`).then(
          ({ status }) => {
            setIsLoggedIn(status == 200);
            setIsLoading(false);
          }
        );
      };
      bootstrapAsync();
    }, []);

    const signIn = async ({ email, name = null, onSuccess, onError }) => {
      const loginOptions = {
        email,
      };
      magic.auth
        .loginWithMagicLink(loginOptions)
        .on("email-sent", () => {})
        .then(async (DIDToken) => {
          const data = name ? { name } : {};
          const resp = await fetch(`${BACKEND_API_URL}/api/login`, {
            headers: new Headers({
              Authorization: "Bearer " + DIDToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            }),
            withCredentials: true,
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify(data),
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
      fetch(`${BACKEND_API_URL}/api/logout`, { method: "POST" }).then(
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
