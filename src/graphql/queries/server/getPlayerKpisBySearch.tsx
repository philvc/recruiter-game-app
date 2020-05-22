import gql from 'graphql-tag';

export const GET_PLAYER_KPIS_BY_SEARCH = gql`
  query playerKpisBySearch ($search: String){
    playerKpisBySearch(input: {search: $search}){
      recruiter{
        id
        playerName
        email
        acceptedJobsNumber
        applicantsNumber
      }
      applicant{
        id
        playerName
        email
        appliedJobs
      }
    }
  }
`