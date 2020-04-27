import gql from 'graphql-tag';

export const GET_MISSIONS_CLIENT = gql`
  query missions($gameId: String){
    missions(input: {gameId: $gameId})@client{
      id
      type
    }
  }
`