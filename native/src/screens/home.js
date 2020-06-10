import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../shared/enhancers/auth';
import Test from '../components/test';

const HomeScreen = () => {
  const {
    authContext: {signOut},
  } = useContext(AuthContext);
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>signOut</Text>
      </TouchableOpacity>
      <Test />
    </View>
  );
};

export default HomeScreen;
