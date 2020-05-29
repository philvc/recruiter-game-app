import gql from 'graphql-tag';

export const NEW_NOTIFICATION_SUBSCRIPTION = gql`
  subscription onNewNotification($clientId: String){
    newNotification(input: {clientId: $clientId}){
      id
      gameId
      label
      isRead
      createdAt
      recipientId
    }
  }
`