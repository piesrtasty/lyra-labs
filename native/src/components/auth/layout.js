import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "@emotion/native";
import { SafeAreaContainer, FullContainer } from "@components/shared";
import { ThemeManagerContext } from "@shared/enhancers/theme-manager";

import WordMarkLogoDark from "@assets/images/wordmark-logo-dark.svg";
import WordMarkLogoLight from "@assets/images/wordmark-logo-light.svg";

const StyledWordMarkLogoDark = styled(WordMarkLogoDark)`
  border: 1px solid red;
  margin-top: 62px;
`;

const StyledWordMarkLogoLight = styled(WordMarkLogoLight)`
  border: 1px solid red;
  margin-top: 62px;
`;

const AuthLayout = ({ children }) => {
  const { isDark } = useContext(ThemeManagerContext);

  return (
    <SafeAreaContainer>
      <WordMarkLogoLight width={310} height={100} />
      <WordMarkLogoDark width={310} height={100} />
      {/* {isDark ? (
        <StyledWordMarkLogoDark width={310} height={100} />
      ) : (
        <StyledWordMarkLogoLight width={310} height={100} />
      )} */}
      {/* <WordMarkLogo width={310} height={100} /> */}
      <FullContainer>{children}</FullContainer>
    </SafeAreaContainer>
  );
};

export default AuthLayout;
