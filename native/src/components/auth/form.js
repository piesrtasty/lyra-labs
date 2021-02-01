import React, { useState, useContext } from "react";
import styled from "@emotion/native";
import { validateEmail } from "@shared/utils";
import { GradientButton, Label } from "@components/shared";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import { CurrentUserContext } from "@shared/enhancers/current-user";

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
  const [isLoading, setIsLoading] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { signIn, signOut, isLoggedIn } = useContext(MagicAuthContext);
  const { refetchCurrentUser } = useContext(CurrentUserContext);

  const handleNameChange = (text) => {
    setName(text);
    setNameValid(text.length > 0);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailValid(validateEmail(text));
  };

  const handleSubmit = () => {
    console.log("handle submit");
    setFormSubmitted(true);
    if (isSignUp && nameValid && emailValid) {
      setIsLoading(true);
      console.log("We signup here");
      signIn({
        email,
        name,
        cb: () => {
          setIsLoading(false);
          refetchCurrentUser();
        },
      });
    } else if (!isSignUp && emailValid) {
      setIsLoading(true);
      signIn({
        email,
        cb: () => {
          setIsLoading(false);
          refetchCurrentUser();
        },
      });
    }
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
      <GradientButton
        isLoading={isLoading}
        width={250}
        handlePress={handleSubmit}
      >
        <Label>Continue</Label>
      </GradientButton>
    </Container>
  );
};

export default Form;
