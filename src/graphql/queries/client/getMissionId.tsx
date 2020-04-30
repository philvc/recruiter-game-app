import { gql } from '@apollo/client';

export const GET_MISSION_ID_CLIENT = gql`
  {  
    missionId @client
  }
`