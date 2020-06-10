import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../shared/enhancers/auth';

const AuthScreen = () => {
  const {
    authContext: {signIn},
  } = useContext(AuthContext);
  return (
    <View>
      <Text>Auth</Text>
      <TouchableOpacity onPress={signIn}>
        <Text>signIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
