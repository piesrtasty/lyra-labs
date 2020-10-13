import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../shared/enhancers/magic-auth";
import { useNavigation } from "@react-navigation/native";

import CookieManager from "@react-native-community/cookies";

import { Magic } from "@magic-sdk/react-native";
const magic = new Magic("pk_test_789150F1861195B5");

import * as Keychain from "react-native-keychain";

const TEAM_ID = "KU5GP44363";
const KEYCHAIN_GROUP = "com.lyralabs.app";
const ACCESS_GROUP = `${TEAM_ID}.${KEYCHAIN_GROUP}`;
const SESSION_KEY = "DIDToken";

const AuthScreen = () => {
  const {
    authContext: { signIn, DIDToken },
  } = useContext(AuthContext);

  // const authData = useContext(AuthContext);

  const navigation = useNavigation();

  const serverUrl = "http://localhost:4000/";

  const handleLogin = async () => {
    const didToken = await magic.auth.loginWithMagicLink({
      email: "lukehamiltonmail@gmail.com",
    });
    await fetch(`${serverUrl}user/login`, {
      headers: new Headers({
        Authorization: "Bearer " + didToken,
      }),
      withCredentials: true,
      credentials: "same-origin",
      method: "POST",
    });
  };

  const handleLogout = async () => {
    await fetch(`${serverUrl}user/logout`, { method: "POST" });
  };

  const handleAuthTest = async () => {
    console.log("handling the auth test");
    let res = await fetch(`${serverUrl}user-details`);
    console.log("res", res);
  };

  const handleNavigate = () => {
    // console.log("navigation", navigation);
    navigation.navigate("Main");
  };

  const handlePrintSavedToken = () => {
    console.log("printing saved token");
    Keychain.getGenericPassword().then(async ({ password: DIDToken }) => {
      console.log("current saved token ", DIDToken);
    });
  };

  const handleClearSavedToken = () => {
    console.log("clearing saved token");
    const removedItem = Keychain.resetGenericPassword();
    console.log("removedItem", removedItem);
  };

  const handlePrintCookies = () => {
    CookieManager.getAll().then((cookies) => {
      console.log("CookieManager.getAll =>", cookies);
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={signIn}>
        <Text>handleLogin</Text>
      </TouchableOpacity>
      <Text>----------------------</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>handleLogout Login</Text>
      </TouchableOpacity>
      <Text>----------------------</Text>
      <TouchableOpacity onPress={handleAuthTest}>
        <Text>handleAuthTest</Text>
      </TouchableOpacity>
      <Text>----------------------</Text>
      <TouchableOpacity onPress={handleNavigate}>
        <Text>Navigagte to main</Text>
      </TouchableOpacity>
      <Text>----------------------</Text>
      <TouchableOpacity onPress={handlePrintSavedToken}>
        <Text>Print Saved Token</Text>
      </TouchableOpacity>
      <Text>----------------------</Text>
      <TouchableOpacity onPress={handleClearSavedToken}>
        <Text>Clear Saved Token</Text>
      </TouchableOpacity>
      <Text>----------------------</Text>
      <TouchableOpacity onPress={handlePrintCookies}>
        <Text>Print Cookies</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
