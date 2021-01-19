import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MAIN_TABS } from "@shared/routes";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator>
      {MAIN_TABS.map(({ route, component, icon }) => (
        <Tab.Screen name={route} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default MainScreen;
