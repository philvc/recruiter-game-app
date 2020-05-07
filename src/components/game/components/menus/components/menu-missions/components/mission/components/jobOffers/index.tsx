import * as React from 'react';

// modules
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// components
import JobOffersTable from './components/table';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { GET_MISSION_SERVER } from '../../../../../../../../../../graphql/queries/server/getMission';
import { SEND_REVIEW_REQUEST } from '../../../../../../../../../../graphql/mutations/server/sendReviewRequest';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { UPDATE_MISSION_COMPLETE } from '../../../../../../../../../../graphql/mutations/server/updateMissionComplete';
import { navigate } from '@reach/router';
import { UPDATE_GAME } from '../../../../../../../../../../graphql/mutations/server/updateGame';
import { CREATE_NEW_MISSION } from '../../../../../../../../../../graphql/mutations/server/createNewMission';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionsClient';

const JobOffers = () => {
  const client = useApolloClient()
  const { missionId, gameId, game }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
  const [createNewMission] = useMutation(CREATE_NEW_MISSION, {
    update(cache, { data: { createNewMission } }) {
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId } })
      client.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId },
        data: {
          missions: missions.concat([createNewMission])
        }
      })
      localStorage.setItem('missions', JSON.stringify(missions.concat([createNewMission])))
    }
  })
  const [updateGame] = useMutation(UPDATE_GAME, {
    variables: { id: gameId },
    onCompleted({ updateGame }) {
      const { missionsAccomplished } = updateGame;

      if (missionsAccomplished === 1 && game.missionsAccomplished === 0) {
        createNewMission({ variables: { gameId, type: 'jobapplication' } })
      }
      localStorage.setItem('game', JSON.stringify(updateGame))
    }
  })
  const [updateMissionComplete] = useMutation(UPDATE_MISSION_COMPLETE, {
    variables: { missionId, gameId },
    onCompleted() {
      updateGame()
      navigate(`/games/${game.title.split(" ").join('')}/missions`)
    }
  })
  const [sendReviewRequest] = useMutation(SEND_REVIEW_REQUEST, { variables: { gameId, missionId } })
  const { loading, error, data } = useQuery(GET_MISSION_SERVER, { variables: { missionId } })
  const [progress, setProgress] = React.useState(null)

  React.useEffect(() => {
    if (data) {

      setProgress(data.mission.progress)
    }
  }, [data, client, missionId])

  if (loading) return null
  if (error) return null

  function handleClick() {
    sendReviewRequest()
  }

  function handleResult() {
    updateMissionComplete()

  }

  const { isReviewed, isRecruiter, score, isEvaluated } = data.mission

  return (
    <div>
      <h1>10 Job Offers Mission</h1>
      {data && progress && <p>{`${progress}/10`}</p>}
      {data && score && <p>Score: {`${score}/10`}</p>}

      <DndProvider backend={Backend}>
        <JobOffersTable missionId={missionId} />
      </DndProvider>
      {progress === 10 && !isEvaluated && <button onClick={handleClick} disabled={isReviewed}>{isReviewed ? 'Under review' : 'Push for review'}</button>}
      {isReviewed && (
        <button onClick={handleResult}>Save Result</button>
      )}
    </div>
  )
}

export default JobOffers;