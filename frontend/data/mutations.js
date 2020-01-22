import gql from "graphql-tag";

export const SIGN_UPLOAD = gql`
  mutation signUpload($fileName: String, $fileType: String) {
    signUpload(fileName: $fileName, fileType: $fileType) {
      signedRequest
      url
    }
  }
`;

export const UPDATE_FOLLOWED_TOPIC = gql`
  mutation updateFollowedTopic(
    $userId: ID!
    $topicId: ID!
    $following: Boolean!
  ) {
    updateFollowedTopic(
      userId: $userId
      topicId: $topicId
      following: $following
    ) {
      id
    }
  }
`;

export const VOTE = gql`
  mutation vote($userId: ID!, $postId: ID!) {
    vote(userId: $userId, postId: $postId) {
      id
    }
  }
`;
