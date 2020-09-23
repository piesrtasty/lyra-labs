import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { useTheme } from "@shared/enhancers/theme-manager";

const Layout = ({ children }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.primaryBackground,
      flex: 1,
    },
  });

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default Layout;
