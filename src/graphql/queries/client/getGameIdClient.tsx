import gql from 'graphql-tag';

export const GET_GAME_ID_CLIENT = gql`
  {
    gameId @client
  }
`