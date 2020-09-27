import React from "react";
import Layout from "@components/layout";
import { Text, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    // backgroundColor: "white",
    height: 200,
  },
});

const HomeScreen = () => (
  <Layout>
    {/* <Text>Home</Text> */}
    <View style={styles.wrapper}>
      <LottieView
        style={styles.container}
        source={require("@assets/animations/final-light.json")}
        autoPlay
        loop
      />
    </View>
  </Layout>
);

export default HomeScreen;
