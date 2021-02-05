import { gql } from "@apollo/client";

export const UPDATE_USER_ONBOARDING = gql`
  mutation($showOnboarding: Boolean!) {
    updateUserOnboarding(showOnboarding: $showOnboarding) {
      id
    }
  }
`;
