if (__DEV__) {
  import("./src/lib/ReactotronConfig").then(() =>
    console.log("Reactotron Configured")
  );
}
import Entry from "./Entry";
import "react-native-gesture-handler";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { flowRight as compose } from "lodash";
import SplashScreen from "@screens/splash";
import { withAuth, AuthContext } from "./src/shared/enhancers/auth";
import { withApollo } from "@shared/enhancers/apollo";
import { withCurrentUser } from "@shared/enhancers/current-user";
import { AppearanceProvider } from "react-native-appearance";
import { ThemeManager } from "./src/shared/enhancers/theme-manager";

import LinearGradient from "react-native-linear-gradient";

const colors = [
  "#FF5E5E",
  "#F55C6D",
  "#EB5A7B",
  "#E1588A",
  "#D75699",
  "#CD54A7",
  "#C351B6",
  "#B94FC4",
  "#AF4DD3",
  "#A54BE2",
  "#9B49F0",
  "#9147FF",
];

const START = 0.3;
const END = 1;

const App = () => {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  const theme = {
    colors: {
      background: "transparent",
    },
  };

  return (
    <LinearGradient
      start={{ x: START, y: START }}
      end={{ x: END, y: END }}
      colors={colors}
      style={{ flex: 1 }}
    >
      <AppearanceProvider>
        <ThemeManager>
          <NavigationContainer theme={theme}>
            <Entry />
          </NavigationContainer>
        </ThemeManager>
      </AppearanceProvider>
    </LinearGradient>
  );
};

const enhance = compose(withCurrentUser, withAuth, withApollo);

export default enhance(App);
