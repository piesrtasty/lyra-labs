import React, { useState } from "react";
import { Appearance } from "react-native-appearance";
import { ThemeProvider } from "@emotion/react";

const themeDark = {
  background: "#121217",
  color: "#FFFFFF",
};

const themeLight = {
  background: "#fffdd0",
  color: "#000000",
};

export const ThemeManagerContext = React.createContext({});

export const ThemeManager = ({ children }) => {
  const osTheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(true);
  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <ThemeManagerContext.Provider value={{ isDark, setIsDark }}>
        {children}
      </ThemeManagerContext.Provider>
    </ThemeProvider>
  );
};
