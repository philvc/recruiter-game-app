import gql from 'graphql-tag';

export const PUSH_NOTIFICATION = gql`
  mutation pushNotification($gameId: String, $label: String, $recipientId: String){
    pushNotification(input: {gameId: $gameId, label: $label, recipientId: $recipientId}){
      id
      label
      gameId
      isRead
      createdAt
    }
  }
`