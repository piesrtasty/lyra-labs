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

import { LinearGradient } from "@shared/enhancers/linear-gradient";

const App = () => {
  const { isLoading } = useContext(MagicAuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  const theme = {
    colors: {
      background: "transparent",
    },
  };

  return (
    <LinearGradient>
      <AppearanceProvider>
        <ThemeManager>
          <NavigationContainer theme={theme}>
            <magic.Relayer />
            <Entry />
          </NavigationContainer>
        </ThemeManager>
      </AppearanceProvider>
    </LinearGradient>
  );
};

const enhance = compose(withCurrentUser, withMagicAuth, withApollo);
// const enhance = compose(withAuth, withApollo);
// const enhance = compose(withAuth);

export default enhance(App);
// export default App;
