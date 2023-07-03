import { gql } from "@apollo/client";
import { REPOSITORY_NODE_FRAGMENT } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryNodeFragment
        }
      }
    }
  }
  ${REPOSITORY_NODE_FRAGMENT}
`;

export const USER_SIGNIN = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
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
