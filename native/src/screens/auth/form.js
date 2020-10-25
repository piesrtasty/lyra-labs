import React, { useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";

var styles = StyleSheet.create({
  container: {
    // backgroundColor: "#FF5E5E",
    // backgroundColor: "#FFF",
    // backgroundColor: PRIMARY_BG_DARK,
    flex: 1,
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
});

import LinearGradient from "react-native-linear-gradient";

const colors = [
  "#FF5E5E",
  "#F55C6D",
  "#EB5A7B",
  "#E1588A",
  "#D75699",
  "#CD54A7",
  "#C351B6",
  "#B94FC4",
  "#AF4DD3",
  "#A54BE2",
  "#9B49F0",
  "#9147FF",
];

const START = 0.3;
const END = 1;

const AuthFormScreen = () => {
  const { signIn, signOut, isLoggedIn, isLoading } = useContext(
    MagicAuthContext
  );

  return (
    <LinearGradient
      start={{ x: START, y: START }}
      end={{ x: END, y: END }}
      colors={colors}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text>FORM</Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AuthFormScreen;
