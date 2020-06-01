import gql from 'graphql-tag';

export const NOTIFICATION_DATA_FRAGMENT = gql`
  fragment NotificationData on Notification {
    id
    label
    isRead
    gameId
    createdAt
    recipientId
  }
`