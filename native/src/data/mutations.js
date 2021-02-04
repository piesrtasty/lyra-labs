import { gql } from "@apollo/client";

export const UPDATE_USER_ONBOARDING = gql`
  mutation updateUserOnboarding($showOnboarding: Boolean!) {
    updateUserOnboarding(showOnboarding: $showOnboarding) {
      showOnboarding
    }
  }
`;
