import React from "react";
import AuthSelectScreen from "./select";
import AuthFormScreen from "./form";
import { ROUTE_AUTH_SELECT, ROUTE_AUTH_FORM } from "@shared/routes";

import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

const AuthScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name={ROUTE_AUTH_SELECT} component={AuthSelectScreen} />
    <AuthStack.Screen name={ROUTE_AUTH_FORM} component={AuthFormScreen} />
  </AuthStack.Navigator>
);

export default AuthScreen;
