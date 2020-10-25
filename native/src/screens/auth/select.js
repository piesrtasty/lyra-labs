import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import LogoTitle from "@components/auth/logo-title";
import Slider from "@components/auth/slider";
import SignInUpSelectForm from "@components/auth/sign-in-up-select-form";
import { PRIMARY_BG_DARK } from "@shared/theme";
import { DM_SANS_REGULAR, DM_SANS_MEDIUM, DM_SANS_BOLD } from "@shared/fonts";

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

const AuthSelectScreen = () => {
  const { signIn, signOut, isLoggedIn, isLoading } = useContext(
    MagicAuthContext
  );

  return (
    <SafeAreaView style={styles.container}>
      <LogoTitle />
      <Slider />
      <SignInUpSelectForm />
    </SafeAreaView>
  );
};

export default AuthSelectScreen;
