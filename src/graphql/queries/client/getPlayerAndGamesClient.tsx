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
      selectedJob {
        id
        url
        missionId
        isAccepted
        rank
        name
        applicationProofUrl
        isComplete
        gameId
      }
      time
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