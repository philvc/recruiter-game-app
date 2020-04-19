import gql from 'graphql-tag';

export const GET_PLAYERANDGAMES_CLIENT = gql`
  query getPlayerAndGamesFromClient {
    player @client{
      id
      firstName
      lastName
      email
    }
    games @client{
      games
    }
    isLoggedIn @client
  }
`