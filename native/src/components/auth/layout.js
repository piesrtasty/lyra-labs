import React from "react";
import { useTheme } from "@emotion/react";
import { SafeAreaContainer, FullContainer } from "@components/shared";
import WordMarkLogo from "@components/word-mark-logo";

const AuthLayout = ({ children }) => {
  const { hasNotch } = useTheme();
  const marginTop = hasNotch ? 62 : 0;
  return (
    <SafeAreaContainer>
      <WordMarkLogo width={310} height={100} style={{ marginTop }} />
      <FullContainer>{children}</FullContainer>
    </SafeAreaContainer>
  );
};

export default AuthLayout;
