import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    id: String!
    email: String
    games: [Game]
    isLoggedIn: Boolean!
    gameId: String
    missionId: String
  }

  extend type Mutation {
    updateGameId(id: String): String
  }
`