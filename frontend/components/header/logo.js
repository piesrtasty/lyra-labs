import React from "react";
import styled from "@emotion/styled";
import LyraLogo from "../../shared/style/logos/lyra-labs-logo.svg";

const StyledLyraLogo = styled(LyraLogo)({
  height: 40,
  width: "auto"
});

const Logo = () => <StyledLyraLogo />;

export default Logo;
