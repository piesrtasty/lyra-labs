import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Magic } from "@magic-sdk/react-native";

const magic = new Magic("pk_test_789150F1861195B5");

const MagicAuthScreen = () => {
  const handlePress = async () => {
    console.log("Handling press");
    const didToken = await magic.auth.loginWithMagicLink({
      email: "lukehamiltonmail@gmail.com",
    });

    // console.log("didToken", didToken);

    // const respA = await fetch(`http://localhost:4000/user/login`, {
    //   headers: new Headers({
    //     Authorization: "Bearer " + didToken,
    //   }),
    //   withCredentials: true,
    //   credentials: "same-origin",
    //   method: "POST",
    // });
    // console.log("respA", respA);

    const respB = await fetch(`http://localhost:4000/healthz`, {
      headers: new Headers({
        Authorization: "Bearer " + didToken,
      }),
      withCredentials: true,
      credentials: "same-origin",
      method: "GET",
    });
    console.log("respB", respB);
  };

  return (
    <View>
      <Text>Magic Auth</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>signIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MagicAuthScreen;
