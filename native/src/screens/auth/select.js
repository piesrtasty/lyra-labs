import React, { useContext } from "react";
import styled from "@emotion/native";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import Slider from "@components/auth/slider";
import AuthLayout from "@components/auth/layout";
// import SignInUpSelectForm from "@components/auth/sign-in-up-select-form";
import Actions from "@components/auth/actions";
import { PRIMARY_BG_DARK } from "@shared/theme";
import { DM_SANS_REGULAR, DM_SANS_MEDIUM, DM_SANS_BOLD } from "@shared/fonts";
import { SafeAreaContainer, SpaceContainer } from "@components/shared";

const AuthSelectScreen = () => {
  const { signIn, signOut, isLoggedIn, isLoading } = useContext(
    MagicAuthContext
  );

  return (
    <SafeAreaContainer>
      <AuthLayout>
        <SpaceContainer>
          <Slider />
          <Actions />
        </SpaceContainer>
      </AuthLayout>
    </SafeAreaContainer>
  );
};

export default AuthSelectScreen;
