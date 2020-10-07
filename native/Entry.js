import React, { useContext } from "react";

import { AuthContext } from "@shared/enhancers/auth";

import AuthScreen from "@screens/auth";
import MainScreen from "@screens/main";

import { useTheme } from "@shared/enhancers/theme-manager";

import { getHeaderTitle, getHeaderStyles } from "@shared/utils";

import { createStackNavigator } from "@react-navigation/stack";

const Entry = () => {
  const Stack = createStackNavigator();

  const { theme } = useTheme();

  const { accessToken } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => {
        console.log("navigation.state", navigation.state);
        const headerStyles = getHeaderStyles(route, theme);

        return {
          headerStyle: { ...headerStyles },
          headerTitle: () => getHeaderTitle(route),
        };
      }}
    >
      {accessToken === null ? (
        // No token found, user isn't signed in
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        // User is signed in
        <Stack.Screen name="Main" component={MainScreen} />
      )}
    </Stack.Navigator>
  );
};

export default Entry;
