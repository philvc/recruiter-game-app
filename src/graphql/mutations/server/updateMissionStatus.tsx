import gql from 'graphql-tag'

export const UPDATE_MISSION_STATUS = gql`
  mutation updateMissionStatus($missionId: String, $status: String){
    updateMissionStatus(input: {missionId: $missionId, status: $status}){
      id
      status
    }
  }
`