import gql from 'graphql-tag';

export const UPDATE_APPLICATIONPROOFURL_CLIENT = gql`
  mutation updateApplicationProofUrl($jobId: String){
    updateApplicationProofUrl(jobId: $jobId) @client
  }
`