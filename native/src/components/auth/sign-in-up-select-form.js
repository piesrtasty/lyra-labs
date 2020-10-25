import React, { useState, useRef } from "react";
import { View, Dimensions, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/pro-light-svg-icons";
import { ROUTE_AUTH_FORM } from "@shared/routes";

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontFamily: "RobotoSlab-Medium",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFF",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    width: 300,
  },
  icon: {
    position: "absolute",
    left: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "OpenSauceSans-Medium",
    // marginLeft: 12,
    flex: 1,
    // back
    textAlign: "center",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  description: {
    color: "#FFF",
    fontFamily: "OpenSauceSans-Regular",
    color: "rgba(245, 246, 247, .9)",
  },
  ctaText: {
    marginLeft: 5,
    fontFamily: "OpenSauceSans-Medium",
    color: "#FFF",
  },
});

const SignInUpSelectForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const title = isSignUp ? "Join Lyra Labs." : "Welcome back.";
  const buttonText = `Sign ${isSignUp ? "up" : "in"} with Email`;
  const description = isSignUp
    ? "Already have an account?"
    : "Don't have an account?";
  const ctaText = isSignUp ? "Sign in." : "Sign up.";

  // const

  const iconOpacity = isPressed ? 0.4 : 0.9;

  const handlePressCta = () => {
    setIsSignUp(!isSignUp);
  };

  const handlePressIn = () => setIsPressed(true);

  const handlePressOut = () => setIsPressed(false);

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(ROUTE_AUTH_FORM);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <View style={styles.button}>
          <FontAwesomeIcon
            style={styles.icon}
            size={24}
            color={`rgba(255, 255, 255, ${iconOpacity})`}
            icon={faEnvelope}
          />
          <Text style={styles.buttonText}>{buttonText}</Text>
        </View>
      </Pressable>
      <Pressable onPress={handlePressCta}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.ctaText}>{ctaText}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SignInUpSelectForm;
