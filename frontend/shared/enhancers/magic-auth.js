import React, { useReducer, useMemo, useState, useEffect } from "react";
// import { Alert } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
// import * as Keychain from "react-native-keychain";
// import { Magic } from "@magic-sdk/react-native";
import { Magic } from "magic-sdk";

const MAGIC_PUBLISHABLE_KEY = "pk_test_789150F1861195B5";
const TEAM_ID = "KU5GP44363";
const KEYCHAIN_GROUP = "com.lyralabs.app";
const ACCESS_GROUP = `${TEAM_ID}.${KEYCHAIN_GROUP}`;
const MAGIC_AUTH_COOKIE_KEY = "magicAuthCookie";
const BACKEND_API_URL = "http://localhost:4000";

export const MagicAuthContext = React.createContext();

export const withMagicAuth = (Component) => {
  const WithMagicAuth = () => {
    // const magic = new Magic(MAGIC_PUBLISHABLE_KEY);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const signIn = async (cb) => {
      const magic = new Magic(MAGIC_PUBLISHABLE_KEY);
      //   console.log("------ CALLING SIGN IN -----", email);
      magic.auth
        .loginWithMagicLink({
          email: "lukehamiltonmail@gmail.com",
        })
        .on("email-sent", () => {
          console.log("email-sent");
        })
        .then(async (DIDToken) => {
          // const resp = await fetch(`${BACKEND_API_URL}/user/login`, {
          const resp = await fetch(`http://localhost:4000/user/login`, {
            headers: new Headers({
              Authorization: "Bearer " + DIDToken,
            }),
            withCredentials: true,
            credentials: "same-origin",
            method: "POST",
          });
          console.log("RESP", resp);
          console.log(">>> cb", cb);
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

    const signOut = async () => {
      console.log("------ CALLING SIGN OUT -----");
      //   fetch(`${BACKEND_API_URL}/user/logout`, { method: "POST" }).then(
      //     ({ status }) => {
      //       setIsLoggedIn(!(status == 200));
      //       setIsLoading(false);
      //     }
      //   );
    };

    return (
      <MagicAuthContext.Provider
        value={{ signIn, signOut, isLoggedIn, isLoading }}
      >
        <Component />
      </MagicAuthContext.Provider>
    );
  };
  return WithMagicAuth;
};
