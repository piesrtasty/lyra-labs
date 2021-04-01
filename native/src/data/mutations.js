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
