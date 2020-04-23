import gql from 'graphql-tag';


export const UPDATE_ALL_JOBS_SERVER = gql`
  mutation updateAllJobs($jobs: [JobInput]){
    updateAllJobs(input: {jobs: $jobs}){
      id
      name 
      url
      rank
    }
  }
`