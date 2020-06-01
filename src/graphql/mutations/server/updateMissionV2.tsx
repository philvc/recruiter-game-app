import gql from 'graphql-tag';

// fragment 
import { MISSION_DATA_FRAGMENT } from '../../fragments/missionDataFragment';

export const UPDATE_MISSION_V2 = gql`
  mutation updateMissionV2($id: String, $data: StringOrIntOrBoolean, $field: String){
    updateMissionV2(input: {id: $id, data:$data, field: $field}){
      ...MissionData
    }
  }
  ${MISSION_DATA_FRAGMENT}
`