import gql from 'graphql-tag';

export const GET_ACCOUNT = gql`
  query getAccount($email: String){
    account(input: {email: $email}){
      player{
        id
        firstName
        lastName
        email
      } 
      games{
        id
        title
        recruiterId
        applicantId
      }
    }
  }
`