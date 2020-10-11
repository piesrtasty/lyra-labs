import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../shared/enhancers/magic-auth";
import { useNavigation } from "@react-navigation/native";

import { Magic } from "@magic-sdk/react-native";
const magic = new Magic("pk_test_789150F1861195B5");

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
    </View>
  );
};

export default AuthScreen;
