import gql from 'graphql-tag';

export const CREATE_10JOBS_SERVER = gql`
  mutation createTenJobs($missionId: String){
    createTenJobs(input: {missionId: $missionId}){
      id
      missionId
      name
      rank
      url
      isAccepted
    }
  }
`