import gql from 'graphql-tag';

// fragment
import { PLAYER_DATA_FRAGMENT } from '../../fragments/playerDataFragment';

export const GET_ACCOUNT = gql`
  query getAccount($email: String){
    account(input: {email: $email}){
      id
      player{
        ...PlayerData
      } 
      games{
        id
        title
        applicant {
          ...PlayerData
        }
        recruiter {
          ...PlayerData
        }
        recruiterId
        applicantId
        createdAt
        missionsAccomplished
      }
    }
  }
  ${PLAYER_DATA_FRAGMENT}
`