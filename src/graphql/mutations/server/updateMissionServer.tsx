import gql from 'graphql-tag';

export const UPDATE_MISSION_SERVER = gql`
  mutation updateMission($id: String){
    updateMission(input: {id: $id}){
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
      }
      time
    }
  }
`