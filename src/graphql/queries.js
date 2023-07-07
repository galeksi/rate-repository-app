import { gql } from "@apollo/client";
import {
  REPOSITORY_NODE_FRAGMENT,
  REPOSITORY_REVIEW_FRAGMENT,
} from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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

export const USER_SIGNOUT = gql`
  query Me {
    me {
      username
    }
  }
`;
