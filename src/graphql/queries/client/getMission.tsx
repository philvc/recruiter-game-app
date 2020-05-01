import { gql } from '@apollo/client';

export const GET_MISSION_CLIENT = gql`
  query getMission($missionId: String, $gameId: String){
    mission(input: {missionId: $missionId, gameId: $gameId}) @client{
      id
      type
    }
  }
`