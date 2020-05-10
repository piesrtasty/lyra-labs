import React, {useState} from 'react';
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

import AsyncStorage from '@react-native-community/async-storage';

import {withApollo} from './shared/enhancers/apollo';
import {withCurrentUser} from './shared/enhancers/current-user';

import Test from './components/test';

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

const BACKEND_URL = 'http://localhost:4000/graphql';

// create an apollo link instance, a network interface for apollo client
const link = new HttpLink({
  uri: BACKEND_URL,
});
// create an inmemory cache instance for caching graphql data
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  const loggedIn = accessToken === null ? false : true;

  const _onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email offline_access',
        audience: 'https://lyralabs.auth0.com/api/v2/',
      })
      .then(credentials => {
        AsyncStorage.setItem('session', JSON.stringify(credentials));
        // Alert.alert('AccessToken: ' + credentials.accessToken);

        console.log('credentials', credentials);
        // setAccessToken(credentials.accessToken);
        // this.setState({ accessToken: credentials.accessToken });
      })
      .catch(error => console.log(error));
  };

  const _onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert('Logged out!');
        setAccessToken(null);
        // this.setState({ accessToken: null });
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.header}> Auth0Sample - Login </Text>
          <Text>You are{loggedIn ? ' ' : ' not '}logged in . </Text>
          <Button
            onPress={loggedIn ? _onLogout : _onLogin}
            title={loggedIn ? 'Log Out' : 'Log In'}
          />
          <Test />
        </View>
      </SafeAreaView>
    </>
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

export default withCurrentUser(App);
