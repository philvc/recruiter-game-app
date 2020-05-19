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
        id
        email
        playerName
      }
      recruiter {
        id
        email
        playerName
      }
      applicantId
      recruiterId
      createdAt
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