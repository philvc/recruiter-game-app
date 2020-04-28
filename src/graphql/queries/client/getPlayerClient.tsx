import gql from 'graphql-tag';

export const GET_PLAYER_CLIENT = gql`
  query getPlayer {
    player @client{
      id
      firstName
    }
  }
`