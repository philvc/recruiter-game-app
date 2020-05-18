import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    id: String!
    email: String
    games: [Game]
    missions: [Mission]
    isLoggedIn: Boolean!
    gameId: String
    missionId: String
  }
`