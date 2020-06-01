import gql from 'graphql-tag';

// fragment
import { NOTIFICATION_DATA_FRAGMENT } from '../../fragments/notificationDataFragment';

export const GET_NOTIFICATIONS_SERVER = gql`
  query getNotifications($gameId: String, $recipientId: String, $pageSize: Int, $after: Int ){
    notifications(input: {gameId: $gameId, recipientId: $recipientId, pageSize: $pageSize, after: $after}){
      cursor
      hasMore
      notifications {
        ...NotificationData
      }
    }
  }
  ${NOTIFICATION_DATA_FRAGMENT}
`