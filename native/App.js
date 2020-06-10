import 'react-native-gesture-handler';
import React, {useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {flowRight as compose} from 'lodash';
import SplashScreen from './src/screens/splash';
import AuthScreen from './src/screens/auth';
import HomeScreen from './src/screens/home';
import {withAuth, AuthContext} from './src/shared/enhancers/auth';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {withApollo} from './src/shared/enhancers/apollo';
import {withCurrentUser} from './src/shared/enhancers/current-user';

import Test from './src/components/test';

import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from '@apollo/react-hooks';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'lyralabs.auth0.com',
  clientId: '08XmtJS37alfY5zW1sVAq2Y0agmy1pV4',
  audience: 'https://lyralabs.auth0.com/api/v2/',
});

const App = () => {
  const Stack = createStackNavigator();
  const {isLoading, accessToken} = useContext(AuthContext);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {accessToken === null ? (
          // No token found, user isn't signed in
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          // User is signed in
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const enhance = compose(withAuth, withApollo);

export default enhance(App);
