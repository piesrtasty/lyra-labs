import React, { useContext } from "react";
import Layout from "@components/layout";
import { Text } from "react-native";

import { CurrentUserContext } from "@shared/enhancers/current-user";

const Profile = () => {
  const data = useContext(CurrentUserContext);
  return (
    <Layout transparentBg={true}>
      <Text style={{ color: "#fff" }}>{JSON.stringify(data)}</Text>
    </Layout>
  );
};

export default Profile;
