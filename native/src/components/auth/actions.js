import React, { useState } from "react";
import styled from "@emotion/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/pro-light-svg-icons";
import {
  GradientButton,
  Label,
  ButtonLabel,
  CenterContainer,
} from "@components/shared";

import { useNavigation } from "@react-navigation/native";
import { ROUTE_AUTH_FORM } from "@shared/routes";

const Container = styled.View`
  background: red;
  margin-top: 28px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Actions = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const buttonText = `Sign ${isSignUp ? "up" : "in"} with email`;
  const description = isSignUp
    ? "Already have an account?"
    : "Don't have an account?";
  const ctaText = isSignUp ? "Sign in." : "Sign up.";
  const iconOpacity = isPressed ? 0.4 : 0.9;
  return (
    <CenterContainer>
      <GradientButton
        handlePress={() => console.log("handlePress")}
        handlePressIn={() => setIsPressed(true)}
        handlePressOut={() => setIsPressed(false)}
      >
        <ButtonContainer>
          <FontAwesomeIcon
            style={{ marginRight: 15 }}
            size={20}
            color={`rgba(255, 255, 255, ${iconOpacity})`}
            icon={faEnvelope}
          />
          <ButtonLabel>{buttonText}</ButtonLabel>
        </ButtonContainer>
      </GradientButton>
      <Container>
        <Label>Sign in with Facebook XXX</Label>
      </Container>
    </CenterContainer>
  );
};

export default Actions;
