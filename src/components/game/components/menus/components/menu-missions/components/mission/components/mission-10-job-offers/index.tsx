import * as React from 'react';

// modules
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// components
import List from './components/list-jobs';
import { useApolloClient } from '@apollo/client';

const Mission10JobOffers = () => {

  // client
  const client = useApolloClient()
  // const { missionId, gameId, game }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })

  // state
  // const [progress, setProgress] = React.useState(null)

  // queries
  // const { loading, error, data } = useQuery(GET_MISSION_SERVER, { variables: { missionId } })

  // mutation
  // const [createNewMission] = useMutation(CREATE_NEW_MISSION, {
  //   update(cache, { data: { createNewMission } }) {
  //     const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId } })
  //     client.writeQuery({
  //       query: GET_MISSIONS_CLIENT,
  //       variables: { gameId },
  //       data: {
  //         missions: missions.concat([createNewMission])
  //       }
  //     })
  //     localStorage.setItem('missions', JSON.stringify(missions.concat([createNewMission])))
  //   }
  // })

  // const [updateGame] = useMutation(UPDATE_GAME, {
  //   variables: { id: gameId },
  //   onCompleted({ updateGame }) {
  //     const { missionsAccomplished } = updateGame;

  //     if (missionsAccomplished === 1 && game.missionsAccomplished === 0) {
  //       createNewMission({ variables: { gameId, type: 'jobapplication' } })
  //     }
  //     localStorage.setItem('game', JSON.stringify(updateGame))
  //   }
  // })

  // const [updateMissionComplete] = useMutation(UPDATE_MISSION_COMPLETE, {
  //   variables: { missionId, gameId },
  //   onCompleted() {
  //     updateGame()
  //     navigate(`/games/${game.title.split(" ").join('')}/missions`)
  //   }
  // })

  // const [sendReviewRequest] = useMutation(SEND_REVIEW_REQUEST, { variables: { gameId, missionId } })


  // // effect
  // React.useEffect(() => {
  //   if (data) {

  //     setProgress(data.mission.progress)
  //   }
  // }, [data, client, missionId])

  // // helpers
  // function handleClick() {
  //   sendReviewRequest()
  // }

  // function handleResult() {
  //   updateMissionComplete()

  // }

  // if (loading) return null
  // if (error) return null



  // const { isReviewed, isRecruiter, score, isEvaluated } = data.mission

  return (
    <div>
      <h1>10 Job Offers Mission</h1>
      {/* {data && progress && <p>{`${progress}/10`}</p>}
      {data && score && <p>Score: {`${score}/10`}</p>} */}

      <DndProvider backend={Backend}>
        <List />
      </DndProvider>
      {/* {progress === 10 && !isEvaluated && <button onClick={handleClick} disabled={isReviewed}>{isReviewed ? 'Under review' : 'Push for review'}</button>}
      {isReviewed && (
        <button onClick={handleResult}>Save Result</button>
      )} */}
    </div>
  )
}

export default Mission10JobOffers;