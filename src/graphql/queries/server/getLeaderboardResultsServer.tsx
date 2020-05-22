import gql from 'graphql-tag';

export const GET_LEADERBOARD_RESULTS_SERVER = gql`
  query getLeaderboardResults {
    leaderboardResults{
      recruiters {
        id
        playerName
        email
        acceptedJobsNumber
        applicantsNumber
      }
      applicants {
        id
        playerName
        email
        appliedJobs
      }
    }
  }
`