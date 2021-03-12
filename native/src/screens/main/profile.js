import React, { useContext, useState } from "react";
import styled from "@emotion/native";
import { GradientButton, Label } from "@components/shared";
import { CurrentUserContext } from "@shared/enhancers/current-user";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import {
  Avatar,
  AVATAR_SIZE_LARGE,
  CenterContainer,
  MediumHeading,
} from "@components/shared";

const Container = styled(CenterContainer)`
  margin-top: 40px;
`;

const Name = styled(MediumHeading)`
  margin-top: 12px;
  margin-bottom: 40px;
`;

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useContext(MagicAuthContext);
  const { currentUser } = useContext(CurrentUserContext);

  const handlePress = () => {
    setIsLoading(true);
    signOut({
      cb: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <Container>
      <Avatar size={AVATAR_SIZE_LARGE} source={{ uri: currentUser.avatar }} />
      <Name>{currentUser.name}</Name>
      <GradientButton
        width={175}
        isLoading={isLoading}
        handlePress={handlePress}
      >
        <Label>Logout</Label>
      </GradientButton>
    </Container>
  );
};

export default Profile;
