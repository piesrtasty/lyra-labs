import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { Container, Main, Aside } from "../../layout";
import { WHITE } from "../../../../style/colors";
import { TITLE_TEXT, BASE_TEXT, WEIGHT } from "../../../../style/typography";
import BaseModal from "../base";
import { withPortal } from "../base/portal";
import LogInButton from "../../buttons/log-in";
import SignUpButton from "../../buttons/sign-up";
import LyraLogo from "../../../../style/logos/lyra-labs-logo.svg";
import {
  MagicAuthContext,
  LoginModalContext,
  CurrentUserContext,
} from "@components/layout";
import {
  CHARCOAL,
  FOCUS_LAVENDER,
  LAVENDER,
  RICE_CAKE,
  PURPLE,
} from "../../../../style/colors";

import {
  Input,
  InputWrapper,
  CharacterCounter,
  Label,
  LabelName,
  LabelQualifier,
  Field,
} from "@library/components/inputs";

const StyledInput = styled(Input)({
  fontSize: "1rem",
  backgroundColor: RICE_CAKE,
  height: "auto",
  marginRight: "1rem",
});

import SimpleButton from "../../../../library/components/buttons/simple";
import StyledButton from "../../../../library/components/buttons/styled";

const styles = {
  fontSize: 11,
  textTransform: "uppercase",
  fontWeight: WEIGHT.BOLD,
  lineHeight: "16px",
};

const StyledLyraLogo = styled(LyraLogo)({
  height: 100,
});

const StyledContainer = styled(Container)({
  width: "100%",
  backgroundColor: WHITE,
  borderRadius: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
});

const Actions = styled("div")({
  margin: "30px 0 20px",
  " > a:last-of-type": {
    marginLeft: 10,
  },
});

const Title = styled("h1")({
  ...TITLE_TEXT,
  fontSize: 20,
  margin: 0,
  lineHeight: "32px",
});

const Description = styled("p")({
  ...BASE_TEXT,
  fontSize: 16,
  margin: 0,
  fontWeight: WEIGHT.LITE,
  lineHeight: "24px",
  textAlign: "center",
  width: 400,
});

const StyledSimpleButton = styled(SimpleButton)({
  ...styles,
  marginLeft: 10,
});

const StyledStyleButton = styled(StyledButton)({
  ...styles,
  backgroundColor: PURPLE,
  borderColor: PURPLE,
  "&:hover": {
    color: CHARCOAL,
    backgroundColor: FOCUS_LAVENDER,
    borderColor: FOCUS_LAVENDER,
  },
});

const Buttons = styled("div")({
  marginTop: 10,
  display: "flex",
});

const TITLE = "Login to Lyra Labs";

const DESCRIPTION =
  "We're not really sure what this is. We're just doing something fun and figuring it out as we go.";

const LoginModal = (items) => {
  const { isLoggedIn, signOut, signIn } = useContext(MagicAuthContext);
  const { refetch } = useContext(CurrentUserContext);
  const { hideLogin } = useContext(LoginModalContext);
  const [email, setEmail] = useState(null);
  const [emailValid, setEmailValid] = useState(false);

  const handleContinue = () => {
    signIn(email, () => {
      hideLogin();
      refetch();
    });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  return (
    <BaseModal width={"auto"}>
      <StyledContainer>
        <StyledInput
          onChange={(e) => handleEmailChange(e.target.value)}
          type="text"
          valid={true}
          placeholder={"Email"}
        />
        <Buttons>
          <StyledStyleButton
            disabled={!emailValid}
            type="button"
            onClick={handleContinue}
          >
            Continue
          </StyledStyleButton>
          <StyledSimpleButton type="button" onClick={hideLogin}>
            Cancel
          </StyledSimpleButton>
        </Buttons>
      </StyledContainer>
    </BaseModal>
  );
};

export default withPortal(LoginModal);
