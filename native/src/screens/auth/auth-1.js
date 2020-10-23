import React, { useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";

var styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF5E5E",
    flex: 1,
  },
});

const AuthScreen = () => {
  const { signIn, signOut, isLoggedIn, isLoading } = useContext(
    MagicAuthContext
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={signIn}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <Text>----------------------</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <Text>----------------------</Text>
      <Text>{`isLoggedIn: ${isLoggedIn}`}</Text>
      <Text>----------------------</Text>
      <Text>{`isLoading: ${isLoading}`}</Text>
    </SafeAreaView>
  );
};

export default AuthScreen;
