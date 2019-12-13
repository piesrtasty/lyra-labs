import gql from "graphql-tag";

export const SECTIONS_QUERY = gql`
  query sections {
    id
  }
`;

export const POSTS_QUERY = gql`
  query post {
    posts {
      id
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      avatar
    }
  }
`;
