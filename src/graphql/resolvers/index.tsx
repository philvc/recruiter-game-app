import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client';


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
  Mutation: ResolverMap
}

export const resolvers: AppResolvers = {
  Mutation: {

  }
}
