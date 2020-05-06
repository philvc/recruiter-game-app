import gql from 'graphql-tag';

export const UPDATE_MISSION_COMPLETE = gql`
  mutation updateMissionComplete($missionId: String, $gameId: String){
    updateMissionComplete(input: {missionId: $missionId, gameId: $gameId}){
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
      selectedJob
    }
      
  }
`