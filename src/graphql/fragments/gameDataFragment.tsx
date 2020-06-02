import gql from 'graphql-tag';

// fragment
import { PLAYER_DATA_FRAGMENT } from './playerDataFragment'

export const GAME_DATA_FRAGMENT = gql`
  fragment GameData on Game {
    id
    title
    recruiterId
    applicant {
      ...PlayerData
    }
    recruiter {
      ...PlayerData
    }
    applicantId
    missionsAccomplished
    createdAt
  }
  ${PLAYER_DATA_FRAGMENT}
`