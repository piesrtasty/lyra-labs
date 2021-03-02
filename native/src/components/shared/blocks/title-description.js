import React from "react";
import styled from "@emotion/native";
import { MediumHeading, Paragraph } from "@components/shared";

const Title = styled(MediumHeading)`
  text-align: center;
`;

const Description = styled(Paragraph)`
  text-align: center;
  margin-top: 15px;
`;

const Container = styled.View`
  align-items: center;
`;

export const TitleDescriptionBlock = ({ title, description, style = {} }) => {
  return (
    <Container style={style}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};
