import React from "react";
import styled from "@emotion/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AuthLayout from "@components/auth/layout";
import { LargeHeading } from "@components/shared";
import { SafeAreaContainer } from "@components/shared";
import Form from "@components/auth/form";

const Heading = styled(LargeHeading)`
  margin-top: 90px;
  text-align: center;
`;

const AuthFormScreen = ({ route }) => {
  const { isSignUp } = route.params;
  const title = `Sign ${isSignUp ? "Up" : "In"} with Email.`;
  return (
    <KeyboardAwareScrollView extraScrollHeight={100}>
      <SafeAreaContainer>
        <AuthLayout>
          <Heading>{title}</Heading>
          <Form isSignUp={isSignUp} />
        </AuthLayout>
      </SafeAreaContainer>
    </KeyboardAwareScrollView>
  );
};

export default AuthFormScreen;
