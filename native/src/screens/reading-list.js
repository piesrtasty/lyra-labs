import React, { useState } from "react";
import styled from "@emotion/native";
import { Dimensions, Text, Pressable, View } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { RegularText } from "@components/shared";

const TabContainer = styled.View`
  flex: 1;
`;

const TabBar = styled.View`
  flex-direction: row;
  height: 40px;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.colors.divider};
  ${"" /* background-color: green; */}
`;

const TabItemContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TabItem = styled.Pressable`
  border-bottom-width: ${(props) => (props.active ? "1px" : "0px")};
  border-color: white;
  height: 40px;
  justify-content: center;
`;

const TabLabel = styled(RegularText)`
  font-size: 14px;
`;

const SavedPosts = () => (
  <TabContainer>
    <RegularText>Saved Posts</RegularText>
  </TabContainer>
);

const ArchivedPosts = () => (
  <TabContainer>
    <RegularText>Archived Posts</RegularText>
  </TabContainer>
);

const initialLayout = { width: Dimensions.get("window").width };

const ReadingListScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "savedPosts", title: "Saved" },
    { key: "archivedPosts", title: "Archived" },
  ]);

  const renderScene = SceneMap({
    savedPosts: SavedPosts,
    archivedPosts: ArchivedPosts,
  });

  const ROUTE_SAVED = "route-saved";
  const ROUTE_ARCHIVED = "route-archived";

  const renderTabBar = () => {
    return (
      <TabBar>
        {routes.map(({ key, title }, i) => {
          const activeTab = index === i;
          const displayTitle =
            key === ROUTE_SAVED
              ? `Saved${count > 0 ? ` (${count})` : ""}`
              : title;
          return (
            <TabItemContainer key={i}>
              <TabItem active={activeTab} onPress={() => setIndex(i)}>
                <TabLabel active={activeTab}>{displayTitle}</TabLabel>
              </TabItem>
            </TabItemContainer>
          );
        })}
      </TabBar>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export default ReadingListScreen;

// import React, { useState } from "react";
// import styled from "@emotion/native";
// import { View, Text, Dimensions } from "react-native";
// import { SafeAreaContainer } from "@components/shared";
// import { TabView, SceneMap } from "react-native-tab-view";

// const initialLayout = { width: Dimensions.get("window").width };

// const Copy = styled.Text`
//   color: #fff;
// `;

// const TabContainer = styled.View`
//   flex: 1;
// `;

// const SavedPosts = () => (
//   <TabContainer>
//     <Copy>Saved Posts</Copy>
//   </TabContainer>
// );

// const ArchivedPosts = () => (
//   <TabContainer>
//     <Copy>Archived Posts</Copy>
//   </TabContainer>
// );

// const ROUTE_SAVED = "route-saved";
// const ROUTE_ARCHIVED = "route-archived";

// const renderScene = SceneMap({
//   [ROUTE_SAVED]: SavedPosts,
//   [ROUTE_ARCHIVED]: ArchivedPosts,
// });

// const renderTabBar = () => {
//   return (
//     <View>
//       <Copy>Tabbar Here</Copy>
//     </View>
//   );
// };

// const ReadingListScreen = () => {
//   const [routes] = useState([
//     { key: ROUTE_SAVED, title: "Saved" },
//     { key: ROUTE_ARCHIVED, title: "Archived" },
//   ]);
//   const [index, setIndex] = useState(0);
//   return (
//     <SafeAreaContainer>
//       {/* <Copy>Reading List</Copy> */}
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         // renderTabBar={renderTabBar}
//         onIndexChange={setIndex}
//         initialLayout={initialLayout}
//         swipeEnabled={false}
//       />
//     </SafeAreaContainer>
//   );
// };

// export default ReadingListScreen;
