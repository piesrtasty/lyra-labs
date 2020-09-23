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

const App = () => {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <AppearanceProvider>
      <ThemeManager>
        <NavigationContainer>
          <Entry />
        </NavigationContainer>
      </ThemeManager>
    </AppearanceProvider>
  );
};

const enhance = compose(withCurrentUser, withAuth, withApollo);

export default enhance(App);
