import gql from "graphql-tag";

export const SECTIONS_QUERY = gql`
  query sections($first: Int!, $skip: Int!) {
    sections(first: $first, skip: $skip) {
      id
      date
      posts {
        id
        name
        slug
        description
        tagline
        thumbnail
        votes {
          id
        }
        topics {
          id
          name
          slug
        }
      }
    }
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
      followedTopics {
        id
        name
      }
    }
  }
`;
