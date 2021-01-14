import React from "react";
import AuthSelectScreen from "./select";
import AuthFormScreen from "./form";
import { ROUTE_AUTH_SELECT, ROUTE_AUTH_FORM } from "@shared/routes";

import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

const AuthScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitle: null,
      headerTintColor: "rgba(255, 255, 255, .4)",
      headerLeftContainerStyle: {
        paddingLeft: 15,
      },
    }}
  >
    <AuthStack.Screen name={ROUTE_AUTH_SELECT} component={AuthSelectScreen} />
    <AuthStack.Screen name={ROUTE_AUTH_FORM} component={AuthFormScreen} />
  </AuthStack.Navigator>
);

export default AuthScreen;
