import { gql } from "@apollo/client";
import { postFields } from "./fragments";

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      avatar
      username
      name
      showOnboarding
    }
  }
`;

export const FEED_POSTS = gql`
  query feedPosts($take: Int, $cursor: ID) {
    feedPosts(take: $take, cursor: $cursor) {
      ...postFields
    }
  }
  ${postFields}
`;

export const SAVED_POSTS = gql`
  query savedPosts($take: Int, $cursor: ID) {
    savedPosts(take: $take, cursor: $cursor) {
      ...postFields
    }
  }
  ${postFields}
`;

export const ARCHIVED_POSTS = gql`
  query archivedPosts($take: Int, $cursor: ID) {
    archivedPosts(take: $take, cursor: $cursor) {
      ...postFields
    }
  }
  ${postFields}
`;

export const SAVED_POSTS_COUNT = gql`
  query savedPostsDetails($username: String) {
    savedPostsDetails(username: $username) {
      count
    }
  }
`;
