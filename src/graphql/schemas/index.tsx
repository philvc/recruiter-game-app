import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    player: Player
    games: [Game]
    isLoggedIn: Boolean!
  }

  extend type Player {
    id: String!
    firstName: String
    lastName: String
    email: String
    __typename: String
  }

  extend type Game {
    id: String!
    title: String
    recruiterId: String
    applicantId: String
  }

  extend type Mutation {
    addPlayer(input: AddPlayerInput): AddPlayerPayload
  }

  extend type AddPlayerPayload {
      player: Player
      games: [Game]
  }

  input AddPlayerInput {
    player: Player
    games: [Game]
  }
`