import gql from 'graphql-tag';

export const GET_ACCOUNT = gql`
  query getAccount($email: String){
    account(input: {email: $email}){
      player{
        id
        email
        playerName
      } 
      games{
        id
        title
        applicant {
          id
          email
          playerName
        }
        recruiter {
          id
          email
          playerName
        }
        recruiterId
        applicantId
        createdAt
        missionsAccomplished
      }
    }
  }
`