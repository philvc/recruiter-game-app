import gql from 'graphql-tag';

export const UPDATE_GAME = gql`
  mutation updateGame($id: String){
    updateGame(id: $id){
      id
      title
      recruiterId
      applicantId
      missionsAccomplished
    }
  }
`