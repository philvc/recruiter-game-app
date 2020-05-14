import gql from 'graphql-tag';

export const GET_MISSION_CLIENT = gql`
  {
    mission @client{
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
        isApplied
        isSelected
      }
      time
    }
  }
`