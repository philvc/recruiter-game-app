import gql from 'graphql-tag';

export const GET_PLAYERANDGAMES_CLIENT = gql`
  query getPlayerAndGamesClient {
    player @client{
      id
      email
      playerName
    }
    games @client{
      id
      title
      applicant {
        email
        playerName
      }
      recruiter {
        email
        playerName
      }
      applicantId
      recruiterId
      missionsAccomplished
    }
    game @client {
      id
      title
      applicantId
      recruiterId
      missionsAccomplished
    }
  }
`