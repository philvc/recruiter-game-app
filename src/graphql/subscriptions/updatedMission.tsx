import gql from 'graphql-tag';

// fragment
import { MISSION_DATA_FRAGMENT } from '../fragments/missionDataFragment';

export const UPDATED_MISSION_SUBSCRIPTION = gql`
  subscription onUpdatedMission($gameId: String){
    updatedMission(input: {gameId: $gameId}){
      ...MissionData
    }
  }
  ${MISSION_DATA_FRAGMENT}
`