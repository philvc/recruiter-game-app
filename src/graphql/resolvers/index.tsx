import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client';
import { GET_PLAYERANDGAMES_CLIENT } from '../queries/client/getPlayerAndGamesClient';


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
    addPlayer: async (__: any, { input }: any, { cache }: any) => {
      console.log('input mutation :', input)
      const { player, games } = await cache.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
      // console.log('query dans mutation :', player, games)
      // const data = await cache.writeQuery({
      //   query: GET_PLAYERANDGAMES_CLIENT,
      //   data: {
      //     player: {
      //       id: 'pépé',
      //       firstName: 'lola',
      //       lastName: 'pouré',
      //       email: 'dkeke',
      //       __typename: 'Player'
      //     },
      //     // games: games.push(input.games)
      //   }
      // })
      cache.data.data.player = { ...input.player }
      return null
    }
  }
}
