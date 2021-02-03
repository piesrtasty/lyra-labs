import React from "react";
import styled from "@emotion/native";
import {
  SafeAreaContainer,
  FullContainer,
  MediumHeading,
  Paragraph,
  GradientButton,
  Label,
  LargeLabel,
} from "@components/shared";

const Container = styled(FullContainer)`
  ${"" /* background-color: yellow; */}
  width: 300px;
  display: flex;
  align-items: center;
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

const OnboardingScreen = () => {
  const handlePress = () => {
    console.log("PRESSED");
  };

  return (
    <SafeAreaContainer>
      <Container>
        <Mock source={require("@assets/images/onboarding-mock.png")} />
        <Title>Enable share extension</Title>
        <SubTitle>
          Save articles, videos and stories from any publication, page or app
          with the share extension.
        </SubTitle>
        <GradientButton
          width={250}
          // isLoading={isLoading}
          handlePress={handlePress}
        >
          <LargeLabel>Continue</LargeLabel>
        </GradientButton>
      </Container>
    </SafeAreaContainer>
  );
};

export default OnboardingScreen;
