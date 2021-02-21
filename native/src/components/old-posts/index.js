import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";

const PostList = ({ name = "COOL GUY" }) => (
  <View>
    <Text style={{ color: "#FFF" }}>Post List</Text>
  </View>
);

export default PostList;
