import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client';

export const typeDefs = gql`
  extend type Query {
    player: Player
    games: [Game]
  }

  extend type Player {
    id: String!
    firstName: String
    lastName: String
    email: String
  }

  extend type Game {
    id: String!
    title: String
    recruiterId: String
    applicantId: String
  }
`

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  // We will update this with our app's resolvers later
}

export const resolvers = {};

