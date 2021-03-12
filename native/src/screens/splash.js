import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { PRIMARY_BG_DARK } from "@shared/theme";

import Logo from "@assets/images/logo.svg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BG_DARK,
    alignItems: "center",
    justifyContent: "center",
  },
});

const SIZE = 150;

const SplashScreen = () => (
  <SafeAreaView style={styles.container}>
    <Logo height={SIZE} width={SIZE} />
  </SafeAreaView>
);

export default SplashScreen;
