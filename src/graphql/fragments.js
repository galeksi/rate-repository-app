import { gql } from "@apollo/client";

export const REPOSITORY_NODE_FRAGMENT = gql`
  fragment RepositoryNodeFragment on Repository {
    description
    forksCount
    fullName
    language
    ratingAverage
    reviewCount
    stargazersCount
    ownerAvatarUrl
    url
  }
`;

export const REPOSITORY_REVIEW_FRAGMENT = gql`
  fragment RepositoryReviewFragment on Repository {
    reviews {
      edges {
        node {
          createdAt
          id
          rating
          text
          user {
            id
            username
          }
        }
      }
    }
  }
`;
