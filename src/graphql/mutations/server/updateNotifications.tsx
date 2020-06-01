import gql from 'graphql-tag';

// fragment
import { NOTIFICATION_DATA_FRAGMENT } from '../../fragments/notificationDataFragment'

export const UPDATE_NOTIFICATIONS = gql`
  mutation updateNotifications($ids: [String], $field: String, $data: StringOrIntOrBoolean){
    updateNotifications(input: {ids: $ids, field: $field, data: $data}){
      ...NotificationData
    }
  }
  ${NOTIFICATION_DATA_FRAGMENT}
`