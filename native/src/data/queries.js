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
      publisher
      logo
      url
      image
      date
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
