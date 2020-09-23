import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";

import PostList from "@components/posts";

const SavedPosts = ({ name = "COOL GUY" }) => (
  <View>
    <Text style={{ color: "#FFF" }}>Saved Posts</Text>
    <PostList />
  </View>
);

export default SavedPosts;
