import gql from 'graphql-tag';

// fragment
import { MISSION_DATA_FRAGMENT } from '../fragments/missionDataFragment';

export const NEW_MISSION_SUBSCRIPTION = gql`
  subscription onNewMission($gameId: String){
    newMission(input: {gameId: $gameId}){
      ...MissionData
    }
  }
  ${MISSION_DATA_FRAGMENT}
`