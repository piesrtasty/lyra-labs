import styled from "@emotion/native";

export const Heading = styled.Text`
  font-family: Montserrat-SemiBold;
  font-size: 20px;
  letter-spacing: -0.15px;
  color: ${(props) => props.theme.colors.primary};
`;

export const Paragraph = styled.Text`
  font-family: Montserrat-Regular;
  font-size: 14px;
  letter-spacing: -0.15px;
  color: ${(props) => props.theme.colors.secondary};
`;

export const Label = styled.Text`
  font-family: Montserrat-Medium;
  font-size: 13px;
  color: ${(props) => props.theme.colors.primary};
`;

export const ButtonLabel = styled(Label)`
  letter-spacing: 1.4px;
`;
