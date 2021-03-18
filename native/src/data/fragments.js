import { gql } from "@apollo/client";

export const postFields = gql`
  fragment postFields on Post {
    id
    title
    publisher
    logo
    url
    image
    date
  }
`;
