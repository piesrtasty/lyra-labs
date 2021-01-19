import React from "react";
import { SafeAreaContainer, FullContainer } from "@components/shared";
import WordMarkLogo from "@components/word-mark-logo";

const AuthLayout = ({ children }) => {
  return (
    <SafeAreaContainer>
      {/* <WordMarkLogo width={310} height={100} style={{ marginTop: 62 }} /> */}
      <FullContainer>{children}</FullContainer>
    </SafeAreaContainer>
  );
};

export default AuthLayout;
