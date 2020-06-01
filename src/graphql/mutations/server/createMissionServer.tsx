import gql from 'graphql-tag';

// fragment 
import { MISSION_DATA_FRAGMENT } from '../../fragments/missionDataFragment';

export const CREATE_MISSION = gql`
  mutation createMission($gameId: String, $type: String, $quantity: Int){
    createMission(input: {gameId: $gameId, type: $type, quantity: $quantity}){
      ...MissionData
    }
  }
  ${MISSION_DATA_FRAGMENT}
`