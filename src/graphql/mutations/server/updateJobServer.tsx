import gql from 'graphql-tag';

export const UPDATE_JOB_SERVER = gql`
  mutation updateJob(
    $id: String,
    $data: StringOrIntOrBoolean,
    $field: String,
    ){
    updateJob(input: 
    {
        id: $id,
        field: $field,
        data: $data
    })
      {
        id
        url
        missionId
        isAccepted
        rank
        name
        applicationProofUrl
        isComplete
        gameId
    }
  }
`