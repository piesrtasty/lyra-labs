import React from 'react';
import gql from 'graphql-tag';
import {View, Text} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {withApollo} from 'react-apollo';

const POSTS_QUERY = gql`
  query post {
    posts {
      id
    }
  }
`;

const Test = () => {
  const {data, error, loading} = useQuery(POSTS_QUERY);

  return (
    <View>
      <Text>The test component</Text>
      {error && <Text>{JSON.stringify(error)}</Text>}
      {loading && <Text>Loading....</Text>}
      {!loading && data && (
        <View>
          <Text>{JSON.stringify(data)}</Text>
        </View>
      )}
    </View>
  );
};

export default withApollo(Test);
