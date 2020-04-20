import gql from 'graphql-tag';

export const GET_GAMES_ClIENT = gql`
  query Games {
    games @client {
      id
      title
    }
  }
`