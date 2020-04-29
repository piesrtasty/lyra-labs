import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Test from './components/test';

import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from '@apollo/react-hooks';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

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
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Test />
        <Text>Cool Guy</Text>
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
