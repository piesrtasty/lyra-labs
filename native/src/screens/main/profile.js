import React, { useContext } from "react";
import Layout from "@components/layout";
import { Text, View } from "react-native";

import { CurrentUserContext } from "@shared/enhancers/current-user";

const Profile = () => {
  const data = useContext(CurrentUserContext);
  return (
    <View>
      <Text style={{ color: "#FFF" }}>Profile</Text>
      {/* <Text style={{ color: "#fff" }}>{JSON.stringify(data)}</Text> */}
    </View>
  );
};

export default Profile;
