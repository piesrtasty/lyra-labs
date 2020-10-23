import React, { useContext } from "react";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import AuthScreen from "@screens/auth";
import MainScreen from "@screens/main";
import { ROUTE_AUTH, ROUTE_MAIN } from "@shared/routes";
import { useTheme } from "@shared/enhancers/theme-manager";
import { getHeaderTitle, getHeaderStyles } from "@shared/utils";
import { createStackNavigator } from "@react-navigation/stack";

const Entry = () => {
  const Stack = createStackNavigator();

  const { theme } = useTheme();
  const { isLoggedIn } = useContext(MagicAuthContext);

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => {
        const headerStyles = getHeaderStyles(route, theme);

        return {
          headerStyle: { ...headerStyles },
          headerTitle: () => getHeaderTitle(route),
        };
      }}
    >
      {isLoggedIn ? (
        <Stack.Screen name={ROUTE_MAIN} component={MainScreen} />
      ) : (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTE_AUTH}
          component={AuthScreen}
        />
      )}
    </Stack.Navigator>
  );
};

export default Entry;
