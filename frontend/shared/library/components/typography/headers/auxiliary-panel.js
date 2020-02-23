import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../../../style/typography";

const Container = styled("div")({
  ...BASE_TEXT,
  fontSize: 16,
  fontWeight: WEIGHT.BOLD,
  marginBottom: 10
});

const AuxiliaryPanelHeader = ({ text }) => {
  return <Container>{text}</Container>;
};

export default AuxiliaryPanelHeader;
