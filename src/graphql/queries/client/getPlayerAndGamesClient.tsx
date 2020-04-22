import gql from 'graphql-tag';

export const GET_PLAYERANDGAMES_CLIENT = gql`
  query getPlayerAndGamesClient {
    id @client
    firstName @client
    lastName @client
    email @client
    games @client {
      id
      title
    }
  }
`