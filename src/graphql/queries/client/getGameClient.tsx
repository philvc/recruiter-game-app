import gql from 'graphql-tag'

export const GET_GAME_CLIENT = gql`
  {
    game @client {
      id
      title
      applicantId
      recruiterId
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
      createdAt
      missionsAccomplished
    }
  }
`