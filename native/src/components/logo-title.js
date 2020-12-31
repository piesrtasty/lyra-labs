import React from "react";
import { useTheme } from "@shared/enhancers/theme-manager";
import { VAPOR_PINK, VAPOR_BLUE } from "@shared/theme";
import LyraLabsLogo from "../../assets/images/lyra-labs-logo.svg";

import { View, Text, StyleSheet } from "react-native";

const sharedStyles = {
  position: "absolute",
  textShadowRadius: 1,
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
  },
  logoTextContainer: {
    marginTop: 10,
    marginLeft: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "600",
  },
  labelText: {
    fontSize: 20,
    fontWeight: "600",
  },
  logoOffsetA: {
    color: VAPOR_PINK,
    textShadowColor: VAPOR_PINK,
    textShadowOffset: { width: 2, height: 2 },
    ...sharedStyles,
  },
  logoOffsetB: {
    color: VAPOR_BLUE,
    textShadowColor: VAPOR_BLUE,
    textShadowOffset: { width: -2, height: -2 },
    ...sharedStyles,
  },
});

export const LogoTitle = () => {
  const { theme } = useTheme();
  const TITLE = "LYRA LABS";
  return (
    <View style={styles.container}>
      <LyraLabsLogo width={40} height={40} />
      <View style={styles.logoTextContainer}>
        {/* <Text style={{ ...styles.logoText, ...styles.logoOffsetA }}>
          {TITLE}
        </Text>
        <Text style={{ ...styles.logoText, ...styles.logoOffsetB }}>
          {TITLE}
        </Text> */}
        {/* <Text style={{ ...styles.logoText, color: theme.headerTextColor }}> */}
        <Text style={{ ...styles.logoText }}>{TITLE}</Text>
      </View>
    </View>
  );
};

export const LabelTitle = ({ label }) => {
  const { theme } = useTheme();
  return (
    // <Text style={{ ...styles.labelText, color: theme.headerTextColor }}>
    <Text style={{ ...styles.labelText }}>{label}</Text>
  );
};
