import React, { useContext } from "react";

import { AuthContext } from "@shared/enhancers/auth";

import AuthScreen from "@screens/auth";
import MainScreen from "@screens/main";

import { useTheme } from "@shared/enhancers/theme-manager";
import { getHeaderTitle } from "@shared/utils";

import { createStackNavigator } from "@react-navigation/stack";

const Entry = () => {
  const Stack = createStackNavigator();

  const { theme } = useTheme();

  const { accessToken } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: {
          backgroundColor: theme.headerBackground,
          borderStyle: "solid",
          borderBottomWidth: 1,
          borderBottomColor: theme.gridLine,
          shadowColor: theme.gridLine,
        },
        headerTitle: () => getHeaderTitle(route),
        cardStyle: {
          backgroundColor: "pink",
        },
      })}
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
