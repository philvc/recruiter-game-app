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
      applicantId
      recruiterId
      missionsAccomplished
    }
    gameId @client
    missionId @client
    missions @client
    mission @client {
      id
      type
      progress
      isReviewed
      isRecruiter
      isLocked
      gameId
      status
      isEvaluated
      score
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