import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import { WHITE, LAVENDER } from "../../shared/style/colors";

const Container = styled("div")({
  ...BASE_TEXT,
  backgroundColor: LAVENDER,
  color: WHITE,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: WEIGHT.BOLD,
  height: 45,
  width: 45,
  fontSize: 24,
  marginRight: 20
});

const Image = styled("img")({
  height: 40,
  transform: "rotate(-90deg)"
});

const Logo = () => (
  <Container>
    <Image src="/logos/lyra-derp.png" />
  </Container>
);

export default Logo;
