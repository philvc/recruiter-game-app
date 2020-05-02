import * as React from 'react';

// modules
import { useMutation, useQuery, useApolloClient, gql } from '@apollo/client';
import { Link } from '@reach/router';

// components
import NavBar from '../../../../../../../navbar';

// grapqhql
import { GET_MISSIONS_SERVER } from '../../../../../../../../graphql/queries/server/getMissionsServer';
import { ADD_LIST10JOBOFFERSMISSION_SERVER } from '../../../../../../../../graphql/mutations/server/addMutationServer';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionsClient';

// style
import './style.css'
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { GET_MISSIONS_ROOT_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionsRootClient';
import { GET_GAME_ID_CLIENT } from '../../../../../../../../graphql/queries/client/getGameId';

const ListMissions = ({ path }: any) => {
  const client = useApolloClient()
  const { gameId }: any = client.readQuery({ query: GET_GAME_ID_CLIENT })
  const { loading, error, data } = useQuery(GET_MISSIONS_SERVER, {
    variables: { gameId },
    onCompleted({ missions }) {
      console.log('missions serverquery')
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
      const { missions }: any = cache.readQuery({ query: GET_MISSIONS_CLIENT, variables: { gameId } })
      cache.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId },
        data: {
          missions: missions.concat([addList10JobOffersMission.mission])
        }
      })
    },
    onCompleted({ addList10JobOffersMission }) {
      const { missions }: any = client.readQuery({ query: GET_MISSIONS_ROOT_CLIENT })
      console.log('missions', missions)
      client.writeQuery({
        query: GET_MISSIONS_ROOT_CLIENT,
        data: {
          missions: missions.concat([addList10JobOffersMission.mission])
        }
      })
    }
  })

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
        {data && data.missions.map((mission: any) => (
          <div key={mission.id}>
            <Link to={`${mission.id}`} onClick={() => {
              client.writeQuery({
                query: gql`{
                  missionId
                }`,
                data: {
                  missionId: mission.id
                }
              })
              localStorage.setItem('missionId', mission.id)
            }}>
              <p>{mission.type}</p>
            </Link>
            <p>progress: {mission.progress}/10</p>
          </div>
        )
        )}
        <button onClick={handleClick}>Start "List 10 job offers" mission</button>
      </div>
    </div>
  )
}

export default ListMissions;