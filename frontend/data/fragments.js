import gql from "graphql-tag";

export const topicFields = gql`
  fragment topicFields on Topic {
    id
    name
    slug
  }
`;
