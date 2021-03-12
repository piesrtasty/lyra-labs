import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/native";
import { Animated } from "react-native";
import { CenterContainer, LargeLabel } from "./";

const FormLabel = styled(LargeLabel)`
  color: ${(props) =>
    props.isValid ? props.theme.colors.primary : props.theme.colors.error};
`;

export const Input = styled.TextInput`
  color: ${(props) => props.theme.colors.primary};
  width: 250px;
  height: 30px;
  border-bottom-width: 1px;
  font-size: 15px;
  border-bottom-color: ${(props) =>
    props.isValid ? props.theme.colors.primary : props.theme.colors.error};
`;

const Container = styled(CenterContainer)`
  height: 56px;
  justify-content: space-between;
`;

export const TextInput = ({
  label = null,
  errorLabel = null,
  onChangeText = null,
  showValidation = false,
  isValid = true,
  style = {},
}) => {
  const [value, setValue] = useState("");
  const displayLabel = showValidation ? (isValid ? label : errorLabel) : label;
  return (
    <Container style={style}>
      {label && (
        <FormLabel isValid={showValidation ? isValid : true}>
          {displayLabel}
        </FormLabel>
      )}
      <Input
        isValid={showValidation ? isValid : true}
        autoCapitalize={"none"}
        value={value}
        onChangeText={(text) => {
          if (onChangeText) {
            onChangeText(text);
          }
          setValue(text);
        }}
      />
    </Container>
  );
};
