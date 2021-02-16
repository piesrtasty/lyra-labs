import React, { useState, useEffect } from "react";
import Layout from "@components/layout";
import { useQuery } from "@apollo/client";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getRouteName } from "@shared/utils";
import { NEW_FEED_POSTS } from "@data/queries";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import PostSkeleton from "@components/post/skeleton";

const getCursor = (data, key) => {
  const arr = data[key];
  return arr[arr.length - 1].id;
  // return arr[key][a];
};

const QUERY_KEY = "newFeedPosts";

const HomeScreen = () => {
  const [cursor, setCursor] = useState(null);
  const { data, error, loading, fetchMore } = useQuery(NEW_FEED_POSTS);

  const handlePress = async () => {
    // consolse.log("pressed", data.newFeedPosts[data.newFeedPosts.length - 1].id);
    // console.log(fetchMore);
    console.log("cursor", cursor);
    console.log("NEW_FEED_POSTS", NEW_FEED_POSTS);

    fetchMore({
      variables: {
        cursor: cursor ? cursor : getCursor(data, QUERY_KEY),
      },
    }).then(({ data }) => {
      const newCursor = getCursor(data, QUERY_KEY);
      console.log("fetchMore data", data);
      console.log("newCursor", newCursor);
    });
  };

  const secondLayout = [
    {
      width: 240,
      height: "20%",
      marginBottom: 20,
    },
    {
      width: "100%",
      height: 60,
    },
  ];

  return (
    <View>
      <PostSkeleton />
      <PostSkeleton />

      {/* <SkeletonContent
        containerStyle={{ flex: 1, width: 300 }}
        isLoading={true}
        layout={[
          { key: "someId", width: 220, height: 20, marginBottom: 6 },
          { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
        ]}
      >
        <Text>Your content</Text>
        <Text>Other content</Text>
      </SkeletonContent> */}
      {/* <SkeletonContent
        layout={secondLayout}
        isLoading={true}
        boneColor="#FFF"
        highlightColor="#333333"
      >
        <Text>Benjamin Franklin</Text>
        <Text>An investment in knowledge pays the best interest.</Text>
      </SkeletonContent> */}

      {/* <TouchableOpacity onPress={handlePress}>
        <Text style={{ color: "#FFF", margin: 20 }}>Press</Text>
      </TouchableOpacity> */}
      {/* {error && <Text style={{ color: "white" }}>{JSON.stringify(error)}</Text>} */}
      {/* {loading && <LoadingIndicator />} */}
      {/* {!loading && data && (
        <View>
          {data.newFeedPosts.map((p, index) => (
            <Text key={index} style={{ color: "white" }}>
              {p.title}
            </Text>
          ))}
        </View>
      )} */}
    </View>
  );
};

export default HomeScreen;
