import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "@emotion/native";
import { SafeAreaContainer, FullContainer } from "@components/shared";

import WordMarkLogo from "@assets/images/wordmark-logo-dark.svg";

const StyledWordMarkLogo = styled(WordMarkLogo)`
  border: 1px solid red;
  margin-top: 62px;
`;

const AuthLayout = ({ children }) => {
  return (
    <SafeAreaContainer>
      <StyledWordMarkLogo width={310} height={100} />
      <FullContainer>{children}</FullContainer>
    </SafeAreaContainer>
  );
};

export default AuthLayout;
