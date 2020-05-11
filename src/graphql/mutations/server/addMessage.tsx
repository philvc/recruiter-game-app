import gql from 'graphql-tag';

export const ADD_MESSAGE = gql`
  mutation addMessage($email: String, $message: String){
    addMessage(input:{email: $email, message:$message}){
      email
      message
    }
  }
`