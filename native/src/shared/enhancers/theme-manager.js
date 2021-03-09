import DeviceInfo from "react-native-device-info";
import React, { useState } from "react";
import { Appearance } from "react-native-appearance";
import { ThemeProvider } from "@emotion/react";

const ACCENT_COLOR = "#645aff";
const ERROR_COLOR = "#ff464b";
const DIVIDER_COLOR = "rgba(255, 255, 255, .05)";

const sharedColors = {
  accent: ACCENT_COLOR,
  error: ERROR_COLOR,
  divider: DIVIDER_COLOR,
};

const themeDark = {
  colors: {
    background: "#121217",
    primary: "rgba(255, 255, 255, 1)",
    secondary: "rgba(255, 255, 255, .8)",
    ...sharedColors,
  },
};

const themeLight = {
  colors: {
    background: "#FFFFFF",
    primary: "rgba(0, 0, 0, 1)",
    secondary: "rgba(0, 0, 0, .8)",
    ...sharedColors,
  },
};

export const ThemeManagerContext = React.createContext({});

export const ThemeManager = ({ children }) => {
  const osTheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(true);
  const baseTheme = isDark ? themeDark : themeLight;
  const hasNotch = DeviceInfo.hasNotch();
  const theme = { ...baseTheme, hasNotch };
  return (
    <ThemeProvider theme={theme}>
      <ThemeManagerContext.Provider value={{ isDark, setIsDark }}>
        {children}
      </ThemeManagerContext.Provider>
    </ThemeProvider>
  );
};
