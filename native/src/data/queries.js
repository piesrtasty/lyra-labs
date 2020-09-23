import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      avatar
      username
      name
    }
  }
`;

export const SAVED_POSTS_COUNT = gql`
  query savedPostsDetails($username: String) {
    savedPostsDetails(username: $username) {
      count
    }
  }
`;
