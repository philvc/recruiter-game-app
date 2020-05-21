import gql from 'graphql-tag';

export const GET_LEADERBOARD_RESULTS_SERVER = gql`
  query getLeaderboardResults {
    leaderboardResults{
      playerName
      email
      acceptedJobsNumber
      applicantsNumber
    }
  }
`