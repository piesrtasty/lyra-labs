import { useQuery } from "@apollo/client";
import React from "react";
import { View, Text } from "react-native";
import { withApollo } from "./apollo";
import { CURRENT_USER_QUERY } from "../../data/queries";

export const CurrentUserContext = React.createContext({});

export const withCurrentUser = (Component) => {
  const WithCurrentUser = ({ user }) => {
    const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});
    // if (loading) {
    //   return (
    //     <View>
    //       <Text>Loading...</Text>
    //     </View>
    //   );
    // }

    // if (error) {
    //   return (
    //     <View>
    //       <Text>{JSON.stringify(error)}</Text>
    //     </View>
    //   );
    // }

    // if (data)
    return (
      <CurrentUserContext.Provider value={data && data.me ? data.me : null}>
        <Component />
      </CurrentUserContext.Provider>
    );
  };

  return withApollo(WithCurrentUser);
};
