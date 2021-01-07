import React, { useContext } from "react";
import styled from "@emotion/native";
import { SafeAreaContainer, FullContainer } from "@components/shared";
import { ThemeManagerContext } from "@shared/enhancers/theme-manager";

import WordMarkLogoDark from "@assets/images/wordmark-logo-dark.svg";
import WordMarkLogoLight from "@assets/images/wordmark-logo-light.svg";

const AuthLayout = ({ children }) => {
  const { isDark } = useContext(ThemeManagerContext);

  const WordMarkLogo = isDark ? WordMarkLogoDark : WordMarkLogoLight;

  const StyledWordMarkLogo = styled(WordMarkLogo)`
    margin-top: 62px;
  `;

  return (
    <SafeAreaContainer>
      <StyledWordMarkLogo width={310} height={100} />
      <FullContainer>{children}</FullContainer>
    </SafeAreaContainer>
  );
};

export default AuthLayout;
