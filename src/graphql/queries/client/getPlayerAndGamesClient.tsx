import gql from 'graphql-tag';

export const GET_PLAYERANDGAMES_CLIENT = gql`
  query getPlayerAndGamesClient {
    player @client{
      id
      firstName
      lastName
      email
    }
    games @client{
      id
      title
      applicantId
      recruiterId
    }
    gameId
    missionId
    missions
  }
`