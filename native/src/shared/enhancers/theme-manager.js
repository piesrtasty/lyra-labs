import React, { useState } from "react";
import { Appearance } from "react-native-appearance";
import { ThemeProvider } from "@emotion/react";

const themeDark = {
  colors: {
    background: "#121217",
    primary: "rgba(255, 255, 255, 1)",
    secondary: "rgba(255, 255, 255, .8)",
  },
};

const themeLight = {
  colors: {
    background: "#FFFFFF",
    primary: "rgba(0, 0, 0, 1)",
    secondary: "rgba(0, 0, 0, .8)",
  },
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
