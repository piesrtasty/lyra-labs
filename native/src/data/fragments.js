import { gql } from "@apollo/client";

export const postFields = gql`
  fragment postFields on Post {
    id
    author
    date
    description
    image
    logo
    publisher
    title
    url
    archived
    pinned
    submitter {
      walletIsSetup
      walletAddress
    }
  }
`;
