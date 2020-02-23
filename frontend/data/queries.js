import gql from "graphql-tag";

export const USER_SEARCH = gql`
  query userSearch($keyword: String) {
    userSearch(keyword: $keyword) {
      id
      username
      name
      avatar
    }
  }
`;

export const SECTIONS_QUERY = gql`
  query sections($first: Int!, $skip: Int!) {
    sections(first: $first, skip: $skip) {
      id
      date
      posts {
        id
        name
        slug
        description
        tagline
        thumbnail
        galleryThumbs
        votes {
          id
        }
        votesCount
        upvoted
        topics {
          id
          name
          slug
        }
      }
    }
  }
`;

export const POSTS_QUERY = gql`
  query post {
    posts {
      id
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      avatar
      username
      followedTopics {
        id
        name
        slug
      }
    }
  }
`;

// {
//   repositoryOwner(login: "Naramsim") {
//     login
//     repositories(first: 3, isFork: true,  orderBy: {field: CREATED_AT, direction: ASC}) {
//       edges {
//         node {
//           description
//         }
//       }
//     }
//   }
// }

export const POST_QUERY = gql`
  query post($slug: String!) {
    post(slug: $slug) {
      id
      name
      slug
      description
      tagline
      thumbnail
      votesCount
      galleryThumbs
      upvoted
      link
      comments(orderBy: { createdAt: desc }) {
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
      creators {
        avatar
        username
        headline
        name
      }
      submitter {
        avatar
        username
        headline
        name
      }
      votes {
        id
      }
      topics {
        id
        name
        slug
      }
    }
  }
`;
