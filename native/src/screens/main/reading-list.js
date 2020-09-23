import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import Layout from "@components/layout";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@shared/enhancers/theme-manager";
import { TabView, SceneMap } from "react-native-tab-view";
import { SAVED_POSTS_COUNT } from "@data/queries";
import SavedPosts from "@components/posts/saved";
import ArchivedPosts from "@components/posts/archived";

import { CurrentUserContext } from "@shared/enhancers/current-user";

const initialLayout = { width: Dimensions.get("window").width };

const TAB_ITEM_PADDING = 12;
const TAB_ITEM_MARGIN = 16;

const ROUTE_SAVED = "route-saved";
const ROUTE_ARCHIVED = "route-archived";

const ReadingList = () => {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);

  const { data, loading } = useQuery(SAVED_POSTS_COUNT);

  const count =
    data && data.savedPostsDetails ? data.savedPostsDetails.count : 0;

  const [routes] = useState([
    { key: ROUTE_SAVED, title: "Saved" },
    { key: ROUTE_ARCHIVED, title: "Archived" },
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scene: {
      flex: 1,
    },
    tabBar: {
      flexDirection: "row",
      backgroundColor: theme.topTabBackgroundColor,
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderBottomColor: theme.gridLine,
    },
    tabItem: {
      alignItems: "center",
      paddingTop: TAB_ITEM_PADDING,
      paddingBottom: TAB_ITEM_PADDING,
      marginLeft: TAB_ITEM_MARGIN,
      marginRight: TAB_ITEM_MARGIN,
    },
    label: {
      color: theme.topTabTextColor,
    },
  });

  const renderScene = SceneMap({
    [ROUTE_SAVED]: SavedPosts,
    [ROUTE_ARCHIVED]: ArchivedPosts,
  });

  const selectedStyles = {
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: theme.topTabBorderActive,
  };

  const { topTabTextColor, topTabTextColorActive } = theme;

  const renderTabBar = () => {
    return (
      <View style={styles.tabBar}>
        {routes.map(({ key, title }, i) => {
          const activeTab = index === i;
          const extraStyles = activeTab ? selectedStyles : {};
          const displayTitle =
            key === ROUTE_SAVED
              ? `Saved${count > 0 ? ` (${count})` : ""}`
              : title;
          return (
            <TouchableOpacity
              style={{ ...styles.tabItem, ...extraStyles }}
              onPress={() => setIndex(i)}
            >
              <Text
                style={{
                  color: activeTab ? topTabTextColorActive : topTabTextColor,
                }}
              >
                {displayTitle}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Layout>
      {!loading && data && (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          swipeEnabled={false}
        />
      )}
    </Layout>
  );
};

export default ReadingList;
