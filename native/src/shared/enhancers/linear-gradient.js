import React from "react";
import RNLinearGradient from "react-native-linear-gradient";

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

export const LinearGradient = ({ children }) => {
  return (
    <RNLinearGradient
      start={{ x: START, y: START }}
      end={{ x: END, y: END }}
      colors={colors}
      style={{ flex: 1 }}
    >
      {children}
    </RNLinearGradient>
  );
};
