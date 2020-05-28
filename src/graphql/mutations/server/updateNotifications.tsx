import gql from 'graphql-tag';

export const UPDATE_NOTIFICATIONS = gql`
  mutation updateNotifications($ids: [String], $field: String, $data: StringOrIntOrBoolean){
    updateNotifications(input: {ids: $ids, field: $field, data: $data}){
      id
      label
      isRead
      gameId
      createdAt
    }
  }
`