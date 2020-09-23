import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../../shared/enhancers/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MAIN_TABS } from "@shared/routes";

import { useTheme } from "../../shared/enhancers/theme-manager";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});

const MainScreen = () => {
  const {
    authContext: { signOut },
  } = useContext(AuthContext);

  const { theme } = useTheme();

  // return (
  //   <View>
  //     <Text>COOL</Text>
  //   </View>
  // );

  return (
    // <View style={styles.container}>
    <Tab.Navigator
      screenOptions={(screenProps) => ({})}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: theme.tabNavigatorBackground,
        },
      }}
    >
      {MAIN_TABS.map(({ route, component, icon }) => (
        <Tab.Screen
          name={route}
          component={component}
          options={({ route }) => ({
            cardStyle: { backgroundColor: "#000" },
            tabBarIcon: ({ focused, color, size }) => {
              // You can return any component that you like here!
              return (
                <FontAwesomeIcon
                  style={{
                    color: focused ? theme.tabBarIconActive : theme.tabBarIcon,
                  }}
                  size={24}
                  icon={icon}
                />
              );
            },
          })}
        />
      ))}
      {/* <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        name="ReadingListScreen"
        component={ReadingListScreen}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            // You can return any component that you like here!
            return (
              <View>
                <Text>COOL</Text>
              </View>
            );
          },
        })}
      />
      <Tab.Screen name="ArchiveScreen" component={ArchiveScreen} />
      <Tab.Screen name="ActivityScreen" component={ActivityScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} /> */}
    </Tab.Navigator>
    // </View>
  );
};

export default MainScreen;
