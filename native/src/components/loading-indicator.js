import React, { useContext } from "react";
import Layout from "@components/layout";
import { useTheme, DARK } from "@shared/enhancers/theme-manager";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: 200,
  },
});

const LoadingIndicator = () => {
  const { mode } = useTheme();
  const source =
    mode === DARK
      ? require("@assets/animations/loading-indicator-dark.json")
      : require("@assets/animations/loading-indicator-light.json");
  return (
    <Layout>
      <View style={styles.wrapper}>
        <LottieView style={styles.container} source={source} autoPlay loop />
      </View>
    </Layout>
  );
};

export default LoadingIndicator;
