import { gql } from "@apollo/client";
import {
  REPOSITORY_NODE_FRAGMENT,
  REPOSITORY_REVIEW_FRAGMENT,
} from "./fragments";

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryNodeFragment
          id
        }
      }
    }
  }
  ${REPOSITORY_NODE_FRAGMENT}
`;

export const GET_SINGLE_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryNodeFragment
      ...RepositoryReviewFragment
    }
  }
  ${REPOSITORY_NODE_FRAGMENT}
  ${REPOSITORY_REVIEW_FRAGMENT}
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      user {
        username
        id
      }
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;

export const USER_SIGNIN = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
      id
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            rating
            text
            user {
              id
              username
            }
            id
            repositoryId
          }
        }
      }
    }
  }
`;
