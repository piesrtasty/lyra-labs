import React from "react";
import styled from "@emotion/styled";
import LyraLogo from "../../shared/style/logos/lyra-labs-logo.svg";

const StyledLyraLogo = styled(LyraLogo)({
  height: 60,
  width: "auto",
  marginRight: 20
});

const Logo = () => <StyledLyraLogo />;

export default Logo;
