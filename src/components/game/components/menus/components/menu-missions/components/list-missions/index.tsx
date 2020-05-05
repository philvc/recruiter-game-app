import * as React from 'react';

// modules
import { useMutation, useQuery, useApolloClient, gql } from '@apollo/client';
import { Link } from '@reach/router';

// components
import NavBar from '../../../../../../../navbar';

// grapqhql
import { GET_MISSIONS_SERVER } from '../../../../../../../../graphql/queries/server/getMissionsServer';
import { ADD_LIST10JOBOFFERSMISSION_SERVER } from '../../../../../../../../graphql/mutations/server/addMutationServer';

// style
import './style.css'
import { GET_GAME_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getGameId';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';

const ListMissions = ({ path }: any) => {
  const client = useApolloClient()
  const [stateMissions, setStateMissions] = React.useState([])
  const { gameId }: any = client.readQuery({ query: GET_GAME_ID_CLIENT })
  const { loading, error, data } = useQuery(GET_MISSIONS_SERVER, {
    variables: { gameId },
    onCompleted(data) {
      const { missions } = data;
      setStateMissions(missions)
      localStorage.setItem('missions', JSON.stringify(missions))
    }

  }
  )
  const [addList10JobOffersMission] = useMutation(ADD_LIST10JOBOFFERSMISSION_SERVER, {
    update(cache, { data: { addList10JobOffersMission } }) {
      const { missions }: any = cache.readQuery({ query: GET_MISSIONS_SERVER, variables: { gameId } })
      const newMissions = missions.concat([addList10JobOffersMission.mission])
      cache.writeQuery({
        query: GET_MISSIONS_SERVER,
        data: {
          missions: newMissions
        }
      })
      setStateMissions(newMissions)
      localStorage.setItem('missions', JSON.stringify(newMissions))

    }
  })

  React.useEffect(() => {
    // il faut un effect pour quand la job table modify la progression de la mission
    if (data?.missions)
      setStateMissions(data.missions)
  }, [data])

  function handleClick() {
    addList10JobOffersMission({ variables: { type: '10jobs', gameId, } })
  }

  if (loading) return null
  if (error) return null

  return (
    <div>
      <NavBar />
      <div className='mission-list-container'>
        <div>
          <h3>Menu Missions</h3>
        </div>
        {data && stateMissions.map((mission: any) => (
          <div key={mission.id}>
            <Link to={`${mission.id}`} onClick={() => {
              client.writeQuery({
                query: GET_PLAYERANDGAMES_CLIENT,
                data: {
                  mission,
                  missionId: mission.id
                }
              })
              localStorage.setItem('missionId', mission.id)
              localStorage.setItem('mission', JSON.stringify(mission))
            }}>
              <p>{mission.type}</p>
            </Link>
            <p>progress: {mission.progress}/10</p>
            {mission.isReviewed && <p>Under review</p>}
          </div>
        )
        )}
        <button onClick={handleClick}>Start "List 10 job offers" mission</button>
      </div>
    </div>
  )
}

export default ListMissions;