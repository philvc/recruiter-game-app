import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    id: String!
    firstName: String
    lastName: String
    email: String
    games: [Game]
    isLoggedIn: Boolean!
    gameId: String
  }

  extend type Mutation {
    updateApplicationProofUrl(input: UpdateApplicationProofUrlInput): String
    updateGameId(id: String): String
  }

  input UpdateApplicationProofUrlInput {
    signedGetUrl: String
    jobId: String
  }
`