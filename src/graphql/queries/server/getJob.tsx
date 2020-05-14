import gql from 'graphql-tag';

export const GET_JOB_SERVER = gql`
  query getJob($jobId: String){
    job(input: {jobId: $jobId}){
      id
      url
      missionId
      isAccepted
      rank
      name
      applicationProofUrl
      isComplete
      gameId
      isApplied
      isSelected
    }
  }
`