import React, { useContext, useState } from "react";
import { View } from "react-native";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_ONBOARDING } from "@data/mutations";
import { GradientButton, Label } from "@components/shared";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signOut } = useContext(MagicAuthContext);

  const [
    updateUserOnboarding,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_USER_ONBOARDING);

  const handlePress = () => {
    setIsLoading(true);
    signOut({
      cb: () => {
        setIsLoading(false);
      },
    });
  };

  const handleOnboarding = () => {
    console.log("handling onboarding", updateUserOnboarding);
    updateUserOnboarding({ variables: { showOnboarding: false } });
    // .then(({ data }) => {
    //   // you can do something with the response here
    //   console.log("data", d);
    // })
    // .catch((e) => {
    //   console.log("E", e);
    //   // you can do something with the error here
    // });
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
      <GradientButton width={175} handlePress={handleOnboarding}>
        <Label>Set onboarding</Label>
      </GradientButton>
    </View>
  );
};

export default Profile;
