import { gql } from "@apollo/client";
import { topicFields, postFields } from "./fragments";

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

export const FEED_POSTS = gql`
  query feedPosts {
    feedPosts {
      ...postFields
      submitter {
        walletIsSetup
        walletAddress
      }
    }
  }
  ${postFields}
`;

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      avatar
      walletAddress
      walletIsSetup
      username
      name
    }
  }
`;
