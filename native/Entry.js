import React, { useContext } from "react";

// import { AuthContext } from "@shared/enhancers/auth";
import { AuthContext } from "@shared/enhancers/magic-auth";

import AuthScreen from "@screens/auth";
import MagicAuthScreen from "@screens/magic-auth";
import MainScreen from "@screens/main";

import { useTheme } from "@shared/enhancers/theme-manager";

import { getHeaderTitle, getHeaderStyles } from "@shared/utils";

import { createStackNavigator } from "@react-navigation/stack";

const Entry = () => {
  const Stack = createStackNavigator();

  const { theme } = useTheme();

  // const { DIDToken } = useContext(AuthContext);

  const DIDToken = null;

  console.log("ENTRY DIDToken", DIDToken);

  return (
    <Stack.Navigator
      initialRouteName={"Main"}
      screenOptions={({ route, navigation }) => {
        // console.log("navigation.state", navigation.state);
        const headerStyles = getHeaderStyles(route, theme);

        return {
          headerStyle: { ...headerStyles },
          headerTitle: () => getHeaderTitle(route),
        };
      }}
    >
      {/* <Stack.Screen name="Auth" component={AuthScreen} />
      {/* <Stack.Screen name="MagicAuth" component={MagicAuthScreen} /> */}
      {/* {DIDToken === null ? ( */}
      {/* // No token found, user isn't signed in */}
      {/* ) : ( */}
      {/* // User is signed in */}
      {/* )} */}
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};

export default Entry;
