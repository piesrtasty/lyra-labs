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
import { USER_POSTS_PAGINATION } from "@data/queries";

const SavedPosts = ({ name = "COOL GUY" }) => (
  <View>
    <Text style={{ color: "#FFF" }}>Saved Posts</Text>
    <PostList />
  </View>
);

export default SavedPosts;
