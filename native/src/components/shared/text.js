import styled from "@emotion/native";

const BaseText = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.colors.primary};
  line-height: 22px;
`;

export const MediumText = styled(BaseText)`
  font-family: Montserrat-Medium;
`;

export const RegularText = styled(BaseText)`
  font-family: Montserrat-Regular;
`;

export const Heading = styled(BaseText)`
  font-family: Montserrat-SemiBold;
`;

export const MediumHeading = styled(Heading)`
  font-size: 20px;
`;

export const LargeHeading = styled(Heading)`
  font-size: 24px;
`;

export const Paragraph = styled.Text`
  font-family: Montserrat-Regular;
  font-size: 14px;
  letter-spacing: -0.15px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.secondary};
`;

export const Footer = styled.Text`
  font-family: Montserrat-Light;
  font-size: 13px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.secondary};
`;

export const Label = styled.Text`
  font-family: Montserrat-Medium;
  font-size: 13px;
  color: ${(props) => props.theme.colors.primary};
`;

export const LargeLabel = styled(Label)`
  font-size: 15px;
`;

export const AccentLabel = styled(Label)`
  font-family: Montserrat-SemiBold;
  color: ${(props) => props.theme.colors.accent};
`;

export const ButtonLabel = styled(Label)`
  letter-spacing: 1.4px;
`;
