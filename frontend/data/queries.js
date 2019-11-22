import gql from "graphql-tag";

export const POSTS_QUERY = gql`
  query post {
    posts {
      id
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query($auth0Id: String) {
    me(auth0Id: $auth0Id) {
      id
      email
    }
  }
`;
