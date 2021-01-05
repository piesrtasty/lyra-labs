import React from "react";
import styled from "@emotion/native";
import {
  GradientButton,
  Label,
  ButtonLabel,
  CenterContainer,
} from "@components/shared";

const Container = styled.View`
  background: red;
  margin-top: 28px;
`;

const Actions = () => (
  <CenterContainer>
    <GradientButton>
      <ButtonLabel>Sign in with email</ButtonLabel>
    </GradientButton>
    <Container>
      <Label>Sign in with Facebook XXX</Label>
    </Container>
  </CenterContainer>
);

export default Actions;
