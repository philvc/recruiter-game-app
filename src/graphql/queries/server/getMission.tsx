import gql from 'graphql-tag';

// fragment 
import { MISSION_DATA_FRAGMENT } from '../../fragments/missionDataFragment';

export const GET_MISSION_SERVER = gql`
  query getMission($missionId: String){
    mission(input: {missionId: $missionId}){
      ...MissionData
    }
  }
  ${MISSION_DATA_FRAGMENT}
`