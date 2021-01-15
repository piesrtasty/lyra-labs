import React, { useContext } from "react";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import AuthScreen from "@screens/auth";
import MainScreen from "@screens/main";
import { ROUTE_AUTH, ROUTE_MAIN } from "@shared/routes";
// import { useTheme } from "@shared/enhancers/theme-manager";
import { getHeaderTitle, getHeaderStyles } from "@shared/utils";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@emotion/react";

const Entry = () => {
  const Stack = createStackNavigator();
  const { isLoggedIn } = useContext(MagicAuthContext);
  const theme = useTheme();

  const navTheme = {
    colors: {
      background: theme.colors.background,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={({ route, navigation }) => {
          // const headerStyles = getHeaderStyles(route, theme);

          return {
            // headerStyle: { ...headerStyles },
            // headerTitle: () => getHeaderTitle(route),
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
    </NavigationContainer>
  );
};

export default Entry;
