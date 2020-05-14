import gql from 'graphql-tag';

export const ADD_JOB_APPLICATION_MISSION = gql`
  mutation addJobApplicationMission($gameId: String, $quantity: Int){
    addJobApplicationMission(input: {gameId: $gameId, quantity: $quantity}){
      id
      type
      progress
      gameId
      isReviewed
      isRecruiter
      isLocked
      status
      score
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
        isSelected
        isApplied
      }
      time
    }
  }
` 