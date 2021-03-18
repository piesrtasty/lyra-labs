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

export const NEW_FEED_POSTS = gql`
  query newFeedPosts($take: Int, $cursor: ID) {
    newFeedPosts(take: $take, cursor: $cursor) {
      ...postFields
    }
  }
  ${postFields}
`;

export const NEW_SAVED_POSTS = gql`
  query newSavedPosts($take: Int, $cursor: ID) {
    newSavedPosts(take: $take, cursor: $cursor) {
      ...postFields
    }
  }
  ${postFields}
`;

export const NEW_ARCHIVED_POSTS = gql`
  query newArchivedPosts($take: Int, $cursor: ID) {
    newArchivedPosts(take: $take, cursor: $cursor) {
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
