import gql from 'graphql-tag'

export const UPDATE_MISSION_V2 = gql`
  mutation updateMissionV2($id: String, $data: StringOrIntOrBoolean, $field: String){
    updateMissionV2(input: {id: $id, data:$data, field: $field}){
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
        isApplied
        isSelected
      }
      time
    }
  }
`