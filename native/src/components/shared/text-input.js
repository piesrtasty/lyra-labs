import React, { useState, useEffect, useRef } from "react";
import { Text, View, TextInput, Animated, StyleSheet } from "react-native";
import { wp } from "@shared/utils";

const styles = StyleSheet.create({
  container: {
    width: wp(70),
  },
  input: {},
});

const handleOnChange = (text) => {
  console.log("handleOnChange - text", text);
};

const Input = () => {
  return (
    // <View style={styles.container}>
    <TextInput
      //   style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
      onChangeText={(text) => handleOnChange(text)}
      //   value={"COOL"}
    />
    // </View>
  );
};

export default Input;
