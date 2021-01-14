import React, { useState } from "react";
import styled from "@emotion/native";
import { validateEmail } from "@shared/utils";
import { GradientButton, Label } from "@components/shared";

import { TextInput } from "@components/shared";

const Container = styled.View`
  margin-top: 60px;
  align-items: center;
`;

const Form = ({ isSignUp }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleNameChange = (text) => {
    setName(text);
    setNameValid(text.length > 0);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSubmit = () => {
    console.log("handle submit");
    setFormSubmitted(true);
    console.log("name is ", name);
    console.log("email is ", email);
  };

  return (
    <Container>
      {isSignUp && (
        <TextInput
          label={"Your full name"}
          errorLabel={"Please enter your name"}
          showValidation={formSubmitted}
          isValid={nameValid}
          onChangeText={handleNameChange}
        />
      )}
      <TextInput
        label={"Your email"}
        errorLabel={"Please enter a valid email address"}
        showValidation={formSubmitted}
        isValid={emailValid}
        onChangeText={handleEmailChange}
        style={{ marginTop: isSignUp ? 35 : 0, marginBottom: 40 }}
      />
      <GradientButton width={250} handlePress={handleSubmit}>
        <Label>Continue</Label>
      </GradientButton>
    </Container>
  );
};

export default Form;
