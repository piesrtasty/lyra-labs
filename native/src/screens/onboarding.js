import React, { useContext } from "react";
import styled from "@emotion/native";
import { useMutation } from "@apollo/client";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import {
  SafeAreaContainer,
  FullContainer,
  MediumHeading,
  Paragraph,
  GradientButton,
  Footer,
  LargeLabel,
} from "@components/shared";

import { UPDATE_USER_ONBOARDING } from "@data/mutations";

const Container = styled(FullContainer)`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Mock = styled.Image`
  margin-top: 42px;
  height: 423px;
  width: 210px;
`;

const Title = styled(MediumHeading)`
  margin-top: 50px;
`;

const SubTitle = styled(Paragraph)`
  margin-top: 14px;
  margin-bottom: 40px;
  text-align: center;
`;

const RemindMe = styled.Pressable`
  margin-top: 14px;
`;

const OnboardingScreen = () => {
  const { setShowOnboarding } = useContext(MagicAuthContext);

  const handlePress = () => {
    // TODO: Send request to setShowonboarding to false
    hideOnboarding();
  };

  const handleRemindMe = () => {
    hideOnboarding();
  };

  const hideOnboarding = () => setShowOnboarding(false);

  return (
    <SafeAreaContainer>
      <Container>
        <Mock source={require("@assets/images/onboarding-mock.png")} />
        <Title>Enable share extension</Title>
        <SubTitle>
          Save articles, videos and stories from any publication, page or app
          with the share extension.
        </SubTitle>
        <GradientButton width={250} handlePress={handlePress}>
          <LargeLabel>Continue</LargeLabel>
        </GradientButton>
        <RemindMe onPress={handleRemindMe}>
          <Footer>Remind me later</Footer>
        </RemindMe>
      </Container>
    </SafeAreaContainer>
  );
};

export default OnboardingScreen;
