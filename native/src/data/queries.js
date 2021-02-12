import { gql } from "@apollo/client";

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
      id
      title
    }
  }
`;

export const USER_POSTS_PAGINATION = gql`
  query userPostsPagination(
    $username: String
    $archived: Boolean
    $skip: Int
    $take: Int
  ) {
    userPostsPagination(
      username: $username
      archived: $archived
      skip: $skip
      take: $take
    ) {
      id
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
