import * as React from 'react';

// modules
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
// import throttle from 'lodash/throttle';

// styles
import './styles.css';
import { StyledNotification } from './styles';

// apollo
import { GET_NOTIFICATIONS_SERVER } from '../../../../../../graphql/queries/server/getNotifications';
import { GET_GAME_CLIENT } from '../../../../../../graphql/queries/client/getGameClient';
import { UPDATE_NOTIFICATIONS } from '../../../../../../graphql/mutations/server/updateNotifications';

const MenuNotification = () => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT });

  // state
  const [isOpen, setIsOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState([])
  // const [scrollTopMax, setScrollTopMax] = React.useState(0)
  const [after, setAfter] = React.useState(0)
  const [hasMore, setHasMore] = React.useState(false)

  // queries
  const { loading, error, data, fetchMore }: any = useQuery(GET_NOTIFICATIONS_SERVER, {
    variables: {
      gameId: game.id,
      recipientId: game.recruiter.id,
      pageSize: 10,
      after: 0,
    }
  })

  // mutations
  const [updateNotifications] = useMutation(UPDATE_NOTIFICATIONS)

  // effects
  React.useEffect(() => {
    if (data?.notifications) {
      setNotifications(data.notifications.notifications)
      setAfter(data.notifications.cursor)
      setHasMore(data.notifications.hasMore)
    }
  }, [data])

  // handlers
  function handleOpenList() {
    setIsOpen(prevState => !prevState)
    const notificationsNotRead = notifications.filter((notification: any) => !notification.isRead).map((notification: any) => notification.id)

    if (notificationsNotRead.length > 0) {
      updateNotifications(
        {
          variables: {
            ids: notificationsNotRead,
            field: 'isRead',
            data: true,
          }
        }
      )
    }

  };

  function handleFetchMore() {
    fetchMore({
      variables: {
        after,
      },
      updateQuery: (prev: any, { fetchMoreResult, ...rest }: any) => {
        if (!fetchMoreResult) return prev;
        console.log('fetchmore', fetchMoreResult)
        return {
          ...fetchMoreResult,
          notifications: {
            ...fetchMoreResult.notifications,
            notifications: [
              ...prev.notifications.notifications,
              ...fetchMoreResult.notifications.notifications,
            ]
          }

        }
      }
    })
  }


  // function handleScroll(e: any) {

  //   if (e.target.scrollTop > scrollTopMax) {
  //     setScrollTopMax(e.target.scrollTop)

  //     if (data.notifications.hasMore) {
  //       console.log('scroll event')
  //       const thrott = throttle(() => {
  //         fetchMore({
  //           variables: {
  //             after,
  //           },
  //           updateQuery: (prev: any, { fetchMoreResult, ...rest }: any) => {
  //             if (!fetchMoreResult) return prev;
  //             console.log('fetchmore', fetchMoreResult)
  //             return {
  //               ...fetchMoreResult,
  //               notifications: {
  //                 ...fetchMoreResult.notifications,
  //                 notifications: [
  //                   ...prev.notifications.notifications,
  //                   ...fetchMoreResult.notifications.notifications,
  //                 ]
  //               }

  //             }
  //           }
  //         })
  //       }, 3000)
  //       thrott()
  //     }
  //   }

  // };




  if (loading) return null
  if (error) return null

  const numberOfNewNotifications = notifications.filter((notification: any) => !notification.isRead).length;
  const plusSign = numberOfNewNotifications === 10 && data?.notifications.hasMore ? '+' : null;

  console.log('notifications', notifications)

  return (
    <div className='notifications-container'>
      <div onClick={handleOpenList}>
        Notifications
        {data && <span>({numberOfNewNotifications}<span>{plusSign}</span>)</span>}
      </div>
      {isOpen && notifications.length > 0 && (
        <div className='notifications-list'>
          {notifications.map((notification: any) => <StyledNotification key={notification.id} className='notifications-list-item'>{notification.label}</StyledNotification>)}
          {hasMore && <button onClick={handleFetchMore}>Load more</button>}
        </div>
      )
      }
    </div>
  )
}

export default MenuNotification