import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
  mutation sendMessage($recipientId: String, $subject: String, $message: String, $link: String){
    sendMessage(input: {recipientId: $recipientId, subject: $subject, message: $message, link: $link})
  }
`