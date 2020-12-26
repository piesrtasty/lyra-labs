import { gql } from "@apollo/client";

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
