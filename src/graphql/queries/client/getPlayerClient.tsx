import gql from 'graphql-tag';

export const GET_PLAYER_CLIENT = gql`
    {
      player @client{
        id
        firstName
        email
      }
    }
`