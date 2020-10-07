import React from "react";
import { SafeAreaView } from "react-native";
import { getLayoutStyles } from "@shared/utils";

import { useTheme } from "@shared/enhancers/theme-manager";

const Layout = ({ children, transparentBg = false }) => {
  const { theme } = useTheme();
  const layoutStyles = getLayoutStyles(transparentBg, theme);
  return <SafeAreaView style={layoutStyles}>{children}</SafeAreaView>;
};

export default Layout;
