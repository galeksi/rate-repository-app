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
  }
`;
