import gql from 'graphql-tag';


export const UPDATE_ALL_JOBS_SERVER = gql`
  mutation updateAllJobs($jobs: [InputJob]){
    updateAllJobs(input: {jobs: $jobs}){
      id
      name 
      url
      rank
    }
  }
`