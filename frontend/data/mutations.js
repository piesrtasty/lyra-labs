import { gql } from "@apollo/client";
import { postFields } from "./fragments";

export const ASSOCIATE_WALLET = gql`
  mutation associateWallet($address: String) {
    associateWallet(address: $address) {
      walletAddress
      walletIsSetup
    }
  }
`;

export const SAVE_EXISTING_POST = gql`
  mutation($postId: ID!) {
    saveExistingPost(postId: $postId) {
      id
    }
  }
`;

export const REMOVE_POST = gql`
  mutation($postId: ID!) {
    removePost(postId: $postId) {
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($givenUrl: String) {
    createPost(givenUrl: $givenUrl) {
      ...postFields
    }
  }
  ${postFields}
`;

export const ARCHIVE_POST = gql`
  mutation archivePost($postId: ID!) {
    archivePost(postId: $postId) {
      ...postFields
    }
  }
  ${postFields}
`;

export const RESTORE_POST = gql`
  mutation restorePost($postId: ID!) {
    restorePost(postId: $postId) {
      ...postFields
    }
  }
  ${postFields}
`;
