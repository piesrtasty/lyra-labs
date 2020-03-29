import React from "react";
import styled from "@emotion/styled";

import {
  Input,
  InputWrapper,
  CharacterCounter,
  Label,
  LabelName,
  LabelQualifier,
  Field
} from "library/inputs";

import { DESKTOP } from "style/breakpoints";

import SimpleButton from "library/buttons/simple";
import StyledButton from "library/buttons/styled";
import { WEIGHT } from "style/typography";
import {
  CHARCOAL,
  FOCUS_LAVENDER,
  LAVENDER,
  PURPLE,
  RICE_CAKE
} from "style/colors";

const styles = {
  height: 36,
  textTransform: "uppercase",
  fontWeight: WEIGHT.BOLD,
  lineHeight: "16px"
};

const StyledSimpleButton = styled(SimpleButton)({
  ...styles
});

const StyledStyleButton = styled(StyledButton)({
  ...styles,
  backgroundColor: PURPLE,
  borderColor: PURPLE,
  "&:hover": {
    color: CHARCOAL,
    backgroundColor: FOCUS_LAVENDER,
    borderColor: FOCUS_LAVENDER
  }
});

const Container = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginRight: ".5rem",
  [DESKTOP]: {
    marginRight: "1rem"
  }
});

const Actions = styled("div")({
  marginLeft: 16,
  display: "flex",
  flexDirection: "row",
  "> button:first-of-type": {
    marginRight: 10
  }
});

const StyledInput = styled(Input)({
  fontSize: "1rem",
  backgroundColor: RICE_CAKE,
  height: "auto"
});

const LinkForm = ({ setFormVisible }) => {
  const handleCancel = () => setFormVisible(false);
  return (
    <Container>
      <StyledInput
        onChange={e => console.log(e.target.value)}
        type="text"
        valid={true}
        placeholder={" Save a URL https://..."}
      />
      <Actions>
        <StyledSimpleButton onClick={handleCancel}>Cancel</StyledSimpleButton>
        <StyledStyleButton>Save</StyledStyleButton>
      </Actions>
    </Container>
  );
};

export default LinkForm;
