import { gql } from "@apollo/client";
import { postFields } from "./fragments";

export const UPDATE_USER_ONBOARDING = gql`
  mutation($showOnboarding: Boolean!) {
    updateUserOnboarding(showOnboarding: $showOnboarding) {
      id
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

export const NEW_ARCHIVE_POST = gql`
  mutation newArchivePost($postId: ID!) {
    newArchivePost(postId: $postId) {
      ...postFields
    }
  }
  ${postFields}
`;

export const NEW_RESTORE_POST = gql`
  mutation newRestorePost($postId: ID!) {
    newRestorePost(postId: $postId) {
      ...postFields
    }
  }
  ${postFields}
`;
