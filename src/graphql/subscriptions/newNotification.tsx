import gql from 'graphql-tag';

// fragment
import { NOTIFICATION_DATA_FRAGMENT } from '../fragments/notificationDataFragment';

export const NEW_NOTIFICATION_SUBSCRIPTION = gql`
  subscription onNewNotification($clientId: String){
    newNotification(input: {clientId: $clientId}){
      ...NotificationData
    }
  }
  ${NOTIFICATION_DATA_FRAGMENT}
`