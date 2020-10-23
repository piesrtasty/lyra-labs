import React, { useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";

const AuthFormScreen = () => {
  const { signIn, signOut, isLoggedIn, isLoading } = useContext(
    MagicAuthContext
  );

  return (
    <SafeAreaView>
      <Text>FORM</Text>
    </SafeAreaView>
  );
};

export default AuthFormScreen;
