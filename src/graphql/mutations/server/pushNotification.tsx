import gql from 'graphql-tag';

// fragment
import { NOTIFICATION_DATA_FRAGMENT } from '../../fragments/notificationDataFragment';

export const PUSH_NOTIFICATION = gql`
  mutation pushNotification($gameId: String, $label: String, $recipientId: String){
    pushNotification(input: {gameId: $gameId, label: $label, recipientId: $recipientId}){
      ...NotificationData
    }
  }
  ${NOTIFICATION_DATA_FRAGMENT}
`