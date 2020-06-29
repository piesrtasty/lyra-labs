import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../shared/enhancers/auth';
import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';

const AuthScreen = () => {
  const {
    authContext: {signIn},
  } = useContext(AuthContext);

  const handlePress = async () => {
    const username = 'cool';
    const password = 'itworks-it really doesSSS';

    const myService = 'org.reactjs.native.example.lyralabs';
    console.log('myService', myService);

    // Store the credentials
    const test = await Keychain.setGenericPassword(username, password, [
      {
        service: myService,
        accessGroup: 'YYX7RJEJSR.org.reactjs.native.example.lyralabs',
      },
    ]);

    console.log('test4', test);

    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username,
        );
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
    // await Keychain.resetGenericPassword();
  };

  return (
    <View>
      <Text>Auth</Text>
      <TouchableOpacity onPress={signIn}>
        <Text>signIn</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <Text>Print AsyncSotrage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
