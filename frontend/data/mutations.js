import gql from "graphql-tag";
import { postFields } from "./fragments";

export const SIGN_UPLOAD = gql`
  mutation signUpload($fileName: String, $fileType: String) {
    signUpload(fileName: $fileName, fileType: $fileType) {
      signedRequest
      url
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
  mutation createPost($postId: String) {
    archivePost(postId: $postId) {
      ...postFields
    }
  }
  ${postFields}
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID, $parentId: ID, $body: String!) {
    createComment(postId: $postId, parentId: $parentId, body: $body) {
      id
      text
      votesCount
      author {
        avatar
        username
        name
      }
      replies {
        id
        text
        votesCount
        author {
          avatar
          username
          name
        }
      }
    }
  }
`;

// export const CREATE_REPLY = gql`
//   mutation createReply($parentId: ID, $body: String!) {
//     createReply(parentId: $parentId, body: $body) {
//       id
//     }
//   }
// `;

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

export const COMMENT_VOTE = gql`
  mutation commentVote($userId: ID!, $commentId: ID!) {
    commentVote(userId: $userId, commentId: $commentId) {
      id
    }
  }
`;
