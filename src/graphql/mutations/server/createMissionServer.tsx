import gql from 'graphql-tag';

export const CREATE_MISSION = gql`
  mutation createMission($gameId: String, $type: String, $quantity: Int){
    createMission(input: {gameId: $gameId, type: $type, quantity: $quantity}){
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