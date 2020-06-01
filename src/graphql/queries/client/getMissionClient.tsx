import gql from 'graphql-tag';

// fragment 
import { MISSION_DATA_FRAGMENT } from '../../fragments/missionDataFragment';

export const GET_MISSION_CLIENT = gql`
  {
    mission @client{
      ...MissionData
    }
  }
  ${MISSION_DATA_FRAGMENT}
`