import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";

const ArchivedPosts = ({ name = "COOL GUY" }) => (
  <View>
    <Text style={{ color: "#FFF" }}>Archived Posts</Text>
  </View>
);

export default ArchivedPosts;
