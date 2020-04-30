import { gql } from '@apollo/client';

export const GET_GAME_ID_CLIENT = gql`
  {
    gameId @client
  }
`