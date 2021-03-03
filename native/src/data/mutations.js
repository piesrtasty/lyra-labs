import { gql } from "@apollo/client";

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

export const REMOVE_EXISTING_POST = gql`
  mutation($postId: ID!) {
    removeExistingPost(postId: $postId) {
      id
    }
  }
`;
