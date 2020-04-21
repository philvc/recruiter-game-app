import gql from 'graphql-tag';

export const ADD_MISSION_SERVER = gql`
  mutation addMission($type: String, $gameId: String){
    addMission(input: {type: $type, gameId: $gameId}){
      id
      type
      gameId
    }
  }
`