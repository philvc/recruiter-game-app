import gql from 'graphql-tag';

export const CREATE_NEW_MISSION = gql`
  mutation createNewMission($gameId: String, $type: String){
    createNewMission(input: {gameId: $gameId, type: $type}){
      id
      type
      status
      isReviewed
      isRecruiter
      progress
      isLocked
      gameId
      isEvaluated
      score
      selectedJob
      time
    }
  }
`