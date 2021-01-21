import React, { useContext } from "react";
import styled from "@emotion/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CurrentUserContext } from "@shared/enhancers/current-user";
import { MAIN_TABS, ROUTES, ROUTE_PROFILE } from "@shared/routes";

const Container = styled.View``;

const TabBar = styled.SafeAreaView`
  height: 75px;
  background-color: blue;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Copy = styled.Text`
  color: #fff;
`;

const ItemContainer = styled.View`
  background-color: green;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Item = styled.Pressable`
  background-color: red;
  margin-top: 15px;
`;

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <Container>
      <TabBar>
        {state.routes.map((route, index) => {
          const details = ROUTES[route.name];
          const { icon, iconSolid } = ROUTES[route.name];
          const isFocused = state.index === index;
          const isProfileRoute = route.name === ROUTE_PROFILE;

          const handlePress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          return (
            <ItemContainer>
              <Item onPress={handlePress}>
                {isProfileRoute ? (
                  <Copy key={index}>Profile</Copy>
                ) : (
                  <FontAwesomeIcon
                    style={{
                      color: "white",
                      // opacity: isFocused ? 1 : 0.6,
                    }}
                    size={24}
                    icon={isFocused ? iconSolid : icon}
                  />
                )}
              </Item>
            </ItemContainer>
          );
        })}
      </TabBar>
    </Container>
  );
};

const MainScreen = () => {
  const data = useContext(CurrentUserContext);
  console.log("data", data);
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      {MAIN_TABS.map(({ route, component, icon }) => (
        <Tab.Screen name={route} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default MainScreen;
