import React, { useReducer, useMemo, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as Keychain from "react-native-keychain";
import { Magic } from "@magic-sdk/react-native";
const magic = new Magic("pk_test_789150F1861195B5");

const audience = "https://lyralabs.auth0.com/api/v2/";

const TEAM_ID = "KU5GP44363";
const KEYCHAIN_GROUP = "com.lyralabs.app";
const ACCESS_GROUP = `${TEAM_ID}.${KEYCHAIN_GROUP}`;
// const SESSION_KEY = "session";
const SESSION_KEY = "DIDToken";

export const AuthContext = React.createContext();

const validateToken = async (DIDToken) => {
  // const resp = await
  // fetch("http://localhost:4000/validate-token", {
  //   headers: new Headers({
  //     Authorization: "Bearer " + DIDToken,
  //     Accept: "application/json",
  //   }),
  //   withCredentials: true,
  //   credentials: "same-origin",
  //   method: "POST",
  // })
  //   .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
  //   .then((obj) => console.log(obj));
  const resp = await fetch("http://localhost:4000/validate-token", {
    headers: new Headers({
      Authorization: "Bearer " + DIDToken,
      Accept: "application/json",
    }),
    withCredentials: true,
    credentials: "same-origin",
    method: "POST",
  });

  const r = await resp.json();
  console.log("r", r);
  // .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
  // .then((obj) => console.log(obj));

  // fetch("https://jsonplaceholder.typicode.com/posts/1");

  // const responseJson = resp.json();
  // const parsedResp = JSON.parse(resp);
  console.log("------------------------");
  // console.log("resp from validate token ------ ", responseJson);
  console.log("------------------------");
};

export const withAuth = (Component) => {
  const WithAuth = () => {
    const [state, dispatch] = useReducer(
      (prevState, action) => {
        switch (action.type) {
          case "RESTORE_TOKEN":
            return {
              ...prevState,
              DIDToken: action.token,
              isLoading: false,
            };
          case "SIGN_IN":
            return {
              ...prevState,
              isSignout: false,
              DIDToken: action.token,
            };
          case "SIGN_OUT":
            return {
              ...prevState,
              isSignout: true,
              DIDToken: null,
            };
        }
      },
      {
        isLoading: true,
        isSignout: false,
        DIDToken: null,
      }
    );

    useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
        Keychain.getGenericPassword().then(async ({ password: DIDToken }) => {
          await AsyncStorage.setItem("DIDToken", DIDToken);
          // After restoring token, we may need to validate it in production apps
          const tokenIsValid = validateToken(DIDToken);
          // dispatch({ type: "RESTORE_TOKEN", token: DIDToken });
          // dispatch({ type: "RESTORE_TOKEN", token: "abcxyz" });
        });

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        // dispatch({ type: "RESTORE_TOKEN", token: DIDToken });
      };

      bootstrapAsync();
    }, []);

    const authContext = useMemo(
      () => ({
        signIn: async ({ email }) => {
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token
          // const didToken = await magic.auth.loginWithMagicLink({
          //   email: "lukehamiltonmail@gmail.com",
          // });
          const serverUrl = "http://localhost:4000/";

          magic.auth
            .loginWithMagicLink({
              email: "lukehamiltonmail@gmail.com",
            })
            .on("email-sent", () => {
              console.log("email-sent");
            })
            .then(async (DIDToken) => {
              console.log("login DID Token", DIDToken);
              await fetch(`${serverUrl}user/login`, {
                headers: new Headers({
                  Authorization: "Bearer " + DIDToken,
                }),
                withCredentials: true,
                credentials: "same-origin",
                method: "POST",
              });

              const longDurationToken = await magic.user.getIdToken({
                lifespan: 604800,
              });

              await Keychain.setGenericPassword(
                SESSION_KEY,
                longDurationToken,
                [
                  {
                    service: KEYCHAIN_GROUP,
                    accessGroup: ACCESS_GROUP,
                  },
                ]
              );
              dispatch({ type: "SIGN_IN", token: DIDToken });
            })
            .once("email-not-deliverable", () => {
              console.log("email-not-deliverable");
            })
            .on("error", () => {
              console.log("Error");
            });
        },
        signOut: async () => {
          auth0.webAuth
            .clearSession({})
            .then(async (success) => {
              const removedItem = Keychain.resetGenericPassword();
              console.log("removedItem from logout", removedItem);
              // await AsyncStorage.removeItem('session');
              dispatch({ type: "SIGN_OUT" });
            })
            .catch((error) => console.log(error));
        },
        signUp: async (data) => {
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token

          dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
        },
      }),
      []
    );
    return (
      <AuthContext.Provider value={{ authContext, ...state }}>
        <magic.Relayer />
        <Component />
      </AuthContext.Provider>
    );
  };
  return WithAuth;
};
