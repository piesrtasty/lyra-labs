import React, { useState, useEffect } from "react";
import Layout from "@components/layout";
import { useQuery } from "@apollo/client";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getRouteName } from "@shared/utils";
import { NEW_FEED_POSTS } from "@data/queries";

const HomeScreen = () => {
  const { data, error, loading, fetchMore } = useQuery(NEW_FEED_POSTS);

  const handlePress = () => {
    console.log("pressed");
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text style={{ color: "#FFF", margin: 20 }}>Press</Text>
      </TouchableOpacity>
      {error && <Text style={{ color: "white" }}>{JSON.stringify(error)}</Text>}
      {/* {loading && <LoadingIndicator />} */}
      {!loading && data && (
        <View>
          {data.newFeedPosts.map((p) => (
            <Text style={{ color: "white" }}>{p.title}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
