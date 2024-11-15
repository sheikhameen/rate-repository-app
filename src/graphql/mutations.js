import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation ($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      text
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;

export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;
