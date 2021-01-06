import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Pressable } from "react-native";

export const GradientButton = ({
  children,
  height = 43,
  width = 300,
  handlePress = null,
  handlePressIn = null,
  handlePressOut = null,
}) => (
  <Pressable
    onPressIn={handlePressIn}
    onPressOut={handlePressOut}
    onPress={handlePress}
  >
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#a573ff", "#645aff"]}
      style={{
        height,
        width,
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </LinearGradient>
  </Pressable>
);
