import gql from 'graphql-tag';

export const GET_LEADERBOARD_RECRUITERS_SERVER = gql`
  query getleaderboardRecruiters($rankFilter: String, $pageSize: Int, $after: Int){
    leaderboardRecruiters(input: {rankFilter: $rankFilter, pageSize: $pageSize, after: $after}){
      leaderboardRecruiters {
        id
        playerName
        email
        acceptedJobsNumber
        applicantsNumber
      }
      hasMore
      cursor
    }
  }
`