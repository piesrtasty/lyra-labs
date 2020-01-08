import React from "react";
import styled from "@emotion/styled";
import StyledButton from "../styled";
import { WHITE, LAVENDER, FOCUS_LAVENDER } from "../../../../style/colors";

const ModifiedStyledButton = styled(StyledButton)({
  borderColor: FOCUS_LAVENDER,
  backgroundColor: FOCUS_LAVENDER
});

const SignUpButton = () => (
  <a href="/api/login">
    <ModifiedStyledButton>Sign Up</ModifiedStyledButton>
  </a>
);

export default SignUpButton;
