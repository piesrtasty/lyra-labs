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
  height: 40,
  width: 40,
  fontSize: 24,
  marginRight: 20
});

const Logo = () => <Container>L</Container>;

export default Logo;
