import gql from 'graphql-tag';

export const JOB_DATA_FRAGMENT = gql`
  fragment JobData on Job {
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
    mission10JobsId
    missionJobApplicationId
  }
`