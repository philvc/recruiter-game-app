import gql from 'graphql-tag';

export const GET_MISSION_SERVER = gql`
  query getMission($id: String){
    mission(input: {missionId: $id}){
      progress
    }
  }
`