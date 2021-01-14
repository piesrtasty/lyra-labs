import React, { useContext } from "react";
import styled from "@emotion/native";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  // TextInput,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import AuthLayout from "@components/auth/layout";
import { LargeHeading } from "@components/shared";
import { SafeAreaContainer, SpaceContainer } from "@components/shared";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import Form from "@components/auth/form";
import TextInput from "@components/shared/text-input";
import { wp } from "@shared/utils";

const Heading = styled(LargeHeading)`
  margin-top: 90px;
  text-align: center;
`;

const AuthFormScreen = ({ route }) => {
  const { signIn, signOut, isLoggedIn, isLoading } = useContext(
    MagicAuthContext
  );

  const { isSignUp } = route.params;

  const handleOnChange = (text) => {
    // console.log("handleOnChange - text", text);
  };

  const title = `Sign ${isSignUp ? "Up" : "In"} with Email.`;
  const buttonText = isSignUp ? "Sign up" : "Sign in";

  const handlePress = () => {
    // signIn();
    const email = "lukehamiltonmail@gmail.com";
    signIn({ email });
  };

  return (
    <SafeAreaContainer>
      <AuthLayout>
        <Heading>{title}</Heading>
        <Form isSignUp={isSignUp} />
      </AuthLayout>
    </SafeAreaContainer>
  );
};

export default AuthFormScreen;
