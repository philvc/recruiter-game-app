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
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { GET_GAME_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getGameId';

const ListMissions = ({ path }: any) => {
  const client = useApolloClient()
  const { gameId }: any = client.readQuery({ query: GET_GAME_ID_CLIENT })
  const { missions }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
  const { loading, error, data } = useQuery(GET_MISSIONS_SERVER, {
    variables: { gameId },
    onCompleted({ missions }) {
      client.writeQuery({
        query: GET_PLAYERANDGAMES_CLIENT,
        data: {
          missions
        }
      })
      localStorage.setItem('missions', JSON.stringify(missions))

    }
  })
  const [addList10JobOffersMission] = useMutation(ADD_LIST10JOBOFFERSMISSION_SERVER, {
    update(cache, { data: { addList10JobOffersMission } }) {
      const { missions }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })
      const newMissions = missions.concat([addList10JobOffersMission.mission])
      client.writeQuery({
        query: GET_PLAYERANDGAMES_CLIENT,
        data: {
          missions: newMissions
        }
      })
      localStorage.setItem('missions', JSON.stringify(newMissions))

    }
  })
  const [stateMissions, setMissions] = React.useState(missions)

  React.useEffect(() => {
    setMissions(missions)
  }, [missions])

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
        {missions && stateMissions.map((mission: any) => (
          <div key={mission.id}>
            <Link to={`${mission.id}`} onClick={() => {
              client.writeQuery({
                query: gql`{
                  missionId
                  mission
                }`,
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