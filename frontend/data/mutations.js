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

export const CREATE_POST = gql`
  mutation createPost($givenUrl: String) {
    createPost(givenUrl: $givenUrl) {
      ...postFields
    }
  }
  ${postFields}
`;

export const ARCHIVE_POST = gql`
  mutation archivePost($postId: String) {
    archivePost(postId: $postId) {
      ...postFields
    }
  }
  ${postFields}
`;

export const RESTORE_POST = gql`
  mutation restorePost($postId: String) {
    restorePost(postId: $postId) {
      ...postFields
    }
  }
  ${postFields}
`;
