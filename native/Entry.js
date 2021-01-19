import React, { useContext } from "react";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import DeviceInfo from "react-native-device-info";
import { TouchableOpacity } from "react-native";
import AuthScreen from "@screens/auth";
import MainScreen from "@screens/main";
import ReadingListScreen from "@screens/reading-list";
import { useNavigation } from "@react-navigation/native";
import { ROUTE_AUTH, ROUTE_MAIN, ROUTE_READING_LIST } from "@shared/routes";
// import { useTheme } from "@shared/enhancers/theme-manager";
import { getHeaderTitle, getHeaderStyles } from "@shared/utils";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@emotion/react";
import styled from "@emotion/native";

const Container = styled.View`
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Copy = styled.Text``;

import WordMarkLogo from "@components/word-mark-logo";
import BookmarkIcon from "@components/bookmark-icon";

const Entry = () => {
  // console.log("StatusBar.currentHeight", StatusBar.currentHeight)
  const hasNotch = DeviceInfo.hasNotch();
  const headerHeight = hasNotch ? 100 : 72;
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
        mode="modal"
        screenOptions={({ route, navigation }) => {
          return {
            headerStyle: {
              backgroundColor: theme.colors.background,
              height: headerHeight,
              shadowColor: "transparent",
            },
          };
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name={ROUTE_MAIN}
              component={MainScreen}
              options={{
                headerTitle: null,
                headerRight: (props) => (
                  <Container>
                    <BookmarkIcon style={{ marginRight: 25 }} />
                  </Container>
                ),
                headerLeft: (props) => (
                  <Container>
                    <WordMarkLogo
                      width={160}
                      height={52}
                      style={{ marginLeft: 20 }}
                    />
                  </Container>
                ),
              }}
              ç
            />
            <Stack.Screen
              options={{
                headerShown: true,
              }}
              name={ROUTE_READING_LIST}
              component={ReadingListScreen}
            />
          </>
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
