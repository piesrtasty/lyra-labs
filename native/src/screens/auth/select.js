import React from "react";
import Slider from "@components/auth/slider";
import AuthLayout from "@components/auth/layout";
import Actions from "@components/auth/actions";
import { SafeAreaContainer, SpaceContainer } from "@components/shared";

const AuthSelectScreen = () => (
  <SafeAreaContainer>
    <AuthLayout>
      <SpaceContainer>
        <Slider />
        <Actions />
      </SpaceContainer>
    </AuthLayout>
  </SafeAreaContainer>
);

export default AuthSelectScreen;
