import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import LyraLabsLogo from "../../../assets/images/lyra-labs-logo.svg";
import { DM_SANS_REGULAR, DM_SANS_MEDIUM, DM_SANS_BOLD } from "@shared/fonts";

// Milkshake
// FoundryFontPackRegular

// Flix-Normal
// Flix-Outline

// IndigoRegular-Regular
// IndigoOutlineFont-Regular

var styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    // justifyContent: "center",
    // backgroundColor: "red",
  },
  title: {
    // fontFamily: "OpenSauceSans-Medium",

    // fontFamily: "OpenSauceSans-Bold",
    fontSize: 30,
    letterSpacing: 5,
    // lineHeight: 40,
  },
  logoText: {
    fontSize: 44,
    color: "#FFF",
    fontFamily: "Milkshake",
    // fontFamily: "OpenSauceSans-Medium",
    fontFamily: "RobotoSlab-Medium",
  },
});

const SIZE = 90;

const LogoTitle = () => {
  return (
    <View style={styles.container}>
      <LyraLabsLogo height={SIZE} width={SIZE} />
      <View style={styles.titleContainer}>
        <Text style={styles.logoText}>Lyra Labs</Text>
        {/* <Text style={{ ...styles.title, marginTop: 5 }}>LYRA </Text> */}
        {/* <Text style={{ ...styles.title, marginTop: 5 }}>LABS</Text> */}
      </View>
    </View>
  );
};

export default LogoTitle;
