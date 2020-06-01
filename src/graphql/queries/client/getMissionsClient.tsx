import gql from 'graphql-tag';

// fragment 
import { MISSION_DATA_FRAGMENT } from '../../fragments/missionDataFragment';

export const GET_MISSIONS_CLIENT = gql`
  query missions($gameId: String){
    missions(input: {gameId: $gameId})@client{
      ...MissionData
    }
  }
  ${MISSION_DATA_FRAGMENT}
`