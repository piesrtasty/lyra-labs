import React, { useState } from "react";
import { Appearance } from "react-native-appearance";
import { getTheme } from "../theme";

const osTheme = Appearance.getColorScheme();

const LIGHT = "light";
export const DARK = "dark";

export const ManageThemeContext = React.createContext({});

export const ThemeManager = ({ children }) => {
  const [mode, setMode] = useState(osTheme);

  const toggleTheme = () => {
    mode === LIGHT ? setMode(DARK) : setMode(LIGHT);
  };

  return (
    <ManageThemeContext.Provider
      value={{
        mode,
        theme: getTheme(mode),
        toggleTheme,
      }}
    >
      {children}
    </ManageThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ManageThemeContext);
