import { gql } from 'apollo-boost';

export const PLAYER_QUERY_CLIENT = gql`
  query player {
    player @client{
      id
      firstName
      _typename
    }
  }
`