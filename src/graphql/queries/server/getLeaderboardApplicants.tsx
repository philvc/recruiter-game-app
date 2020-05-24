import gql from 'graphql-tag';

export const GET_LEADERBOARD_APPLICANTS_SERVER = gql`
  query getleaderboardApplicants($rankFilter: String, $pageSize: Int, $after: Int){
    leaderboardApplicants(input: {rankFilter: $rankFilter, pageSize: $pageSize, after: $after}){
      leaderboardApplicants {
        id
        playerName
        email
        appliedJobs
      }
      hasMore
      cursor
    }
  }
`