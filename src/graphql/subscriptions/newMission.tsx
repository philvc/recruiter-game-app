import gql from 'graphql-tag';

// fragment
import { MISSION_DATA_FRAGMENT } from '../fragments/missionDataFragment';

export const NEW_MISSION_SUBSCRIPTION = gql`
  subscription onNewMission($gameId: String, $playerId: String){
    newMission(input: {gameId: $gameId, playerId: $playerId}){
      ...MissionData
    }
  }
  ${MISSION_DATA_FRAGMENT}
`