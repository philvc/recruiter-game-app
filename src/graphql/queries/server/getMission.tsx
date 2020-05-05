import gql from 'graphql-tag';

export const GET_MISSION_SERVER = gql`
  query getMission($missionId: String){
    mission(input: {missionId: $missionId}){
      id
      type
      status
      isReviewed
      progress
    }
  }
`