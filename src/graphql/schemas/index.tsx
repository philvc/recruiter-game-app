import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    id: String!
    firstName: String
    lastName: String
    email: String
    games: [Game]
    isLoggedIn: Boolean!
  }

`