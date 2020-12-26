import React, { useContext } from "react";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import { SlideMenuContext } from "@components/slide-menu";
import { CurrentUserContext } from "@shared/enhancers/current-user";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import { getTabBarStyles } from "@shared/utils";
import { SlideMenu } from "@components/slide-menu";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const Tab = createBottomTabNavigator();

import { faSort } from "@fortawesome/pro-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MAIN_TABS, ROUTES, ROUTE_HOME } from "@shared/routes";

import { useTheme } from "@shared/enhancers/theme-manager";

var styles = StyleSheet.create({
  container: {},
  bar: {
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  sort: {
    marginRight: 5,
  },
});

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const { theme } = useTheme();
  const route = useRoute();

  const tabBarStyles = getTabBarStyles(route, theme);

  const { toggleModal, activeMenuItem } = useContext(SlideMenuContext);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ ...tabBarStyles, ...styles.bar }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const isHomeRoute = route.name === ROUTE_HOME;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }

            if (isFocused && isHomeRoute) {
              toggleModal();
              console.log("show the menu");
            }
          };

          const { icon, iconSolid } = isHomeRoute
            ? activeMenuItem
            : ROUTES[route.name];

          return (
            <Pressable onPress={onPress} style={styles.item}>
              {isHomeRoute && (
                <FontAwesomeIcon
                  style={{
                    color: "white",
                    opacity: 0.6,
                    marginRight: 5,
                  }}
                  size={20}
                  icon={faSort}
                />
              )}
              <FontAwesomeIcon
                style={{
                  color: "white",
                  opacity: isFocused ? 1 : 0.6,
                }}
                size={24}
                icon={isFocused ? iconSolid : icon}
              />
            </Pressable>
          );
        })}
      </SafeAreaView>
    </View>
  );
};

const MainScreen = () => {
  // const {
  //   authContext: { signOut },
  // } = useContext(AuthContext);

  const { theme } = useTheme();

  const route = useRoute();

  const tabBarStyles = getTabBarStyles(route, theme);

  const { signOut } = useContext(MagicAuthContext);

  const data = useContext(CurrentUserContext);

  return (
    <View>
      <Text>Main Screen</Text>
      <TouchableOpacity onPress={signOut}>
        <Text style={{ color: "#000" }}>{JSON.stringify(data)}</Text>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
    // <SlideMenu>
    //   <Tab.Navigator
    //     tabBar={(props) => <CustomTabBar {...props} />}
    //     tabBarOptions={{
    //       showLabel: false,
    //       style: {
    //         ...tabBarStyles,
    //       },
    //     }}
    //   >
    //     {MAIN_TABS.map(({ route, component, icon }) => (
    //       <Tab.Screen name={route} component={component} />
    //     ))}
    //   </Tab.Navigator>
    // </SlideMenu>
  );
};

export default MainScreen;
