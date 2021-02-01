import React, { useContext, useState } from "react";
import { View } from "react-native";
import { GradientButton, Label } from "@components/shared";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signOut } = useContext(MagicAuthContext);

  const handlePress = () => {
    setIsLoading(true);
    signOut({
      cb: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <View>
      <GradientButton
        width={175}
        isLoading={isLoading}
        handlePress={handlePress}
      >
        <Label>Logout</Label>
      </GradientButton>
    </View>
  );
};

export default Profile;
