import gql from 'graphql-tag';

export const GET_NOTIFICATIONS_SERVER = gql`
  query getNotifications($gameId: String, $recipientId: String, $pageSize: Int, $after: Int ){
    notifications(input: {gameId: $gameId, recipientId: $recipientId, pageSize: $pageSize, after: $after}){
      cursor
      hasMore
      notifications {
        id
        label
        isRead
        gameId
        createdAt
      }
    }
  }
`