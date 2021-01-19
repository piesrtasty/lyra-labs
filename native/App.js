if (__DEV__) {
  import("./src/lib/ReactotronConfig").then(() =>
    console.log("Reactotron Configured")
  );
}
import Entry from "./Entry";
import "react-native-gesture-handler";
import React, { useContext } from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { flowRight as compose } from "lodash";
import SplashScreen from "@screens/splash";
import { useTheme } from "@emotion/react";

import {
  withMagicAuth,
  MagicAuthContext,
} from "./src/shared/enhancers/magic-auth";
import { withApollo } from "@shared/enhancers/apollo";
import { withCurrentUser } from "@shared/enhancers/current-user";
import { AppearanceProvider } from "react-native-appearance";
import { ThemeManager } from "./src/shared/enhancers/theme-manager";
import { Magic } from "@magic-sdk/react-native";

const magic = new Magic("pk_test_789150F1861195B5");

const App = () => {
  const { isLoading } = useContext(MagicAuthContext);
  if (isLoading) {
    return <SplashScreen />;
  }

  // const myTheme = useTheme();

  // console.log("--- myTheme --- ", myTheme);

  const theme = {
    colors: {
      // background: "#EF937F",
    },
  };

  return (
    <AppearanceProvider>
      <ThemeManager>
        <magic.Relayer />
        <Entry />
      </ThemeManager>
    </AppearanceProvider>
  );
};

const enhance = compose(withCurrentUser, withMagicAuth, withApollo);

export default enhance(App);
