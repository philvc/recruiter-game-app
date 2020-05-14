import * as React from 'react';

// modules
import { useMutation, useQuery, useApolloClient, gql } from '@apollo/client';
import { Link } from '@reach/router';

// components
import NavBar from '../../../../../../../navbar';
import Contact from '../../../../../../../contact';

// grapqhql
import { GET_MISSIONS_SERVER } from '../../../../../../../../graphql/queries/server/getMissionsServer';
import { ADD_LIST10JOBOFFERSMISSION_SERVER } from '../../../../../../../../graphql/mutations/server/addList10JobOffersMission';
import { GET_PLAYERANDGAMES_CLIENT } from '../../../../../../../../graphql/queries/client/getPlayerAndGamesClient';
import { GET_MISSIONS_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionsClient';
import { GET_MISSION_CLIENT } from '../../../../../../../../graphql/queries/client/getMissionClient';

// style
import './style.css'

const ListMissions = ({ path }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_PLAYERANDGAMES_CLIENT })

  // state
  const [stateMissions, setStateMissions] = React.useState([])

  // queries
  const { loading, error, data } = useQuery(GET_MISSIONS_SERVER, {
    variables: { gameId: game.id },
    onCompleted(data) {
      const { missions } = data;
      client.writeQuery({
        query: GET_MISSIONS_CLIENT,
        variables: { gameId: game.id },
        data: {
          missions: [...missions]
        }
      })
      setStateMissions(missions.filter((mission: any) => mission.type === '10jobs'))
      localStorage.setItem('missions', JSON.stringify(missions))
    }

  }
  )

  // mutations
  const [addList10JobOffersMission] = useMutation(ADD_LIST10JOBOFFERSMISSION_SERVER, {
    update(cache, { data: { addList10JobOffersMission } }) {
      const { missions }: any = cache.readQuery({ query: GET_MISSIONS_SERVER, variables: { gameId: game.id } })

      const newMissions = missions.concat([addList10JobOffersMission.mission])
      cache.writeQuery({
        query: GET_MISSIONS_SERVER,
        variables: { gameId: game.id },
        data: {
          missions: newMissions
        }
      })
      setStateMissions(newMissions.filter((mission: any) => mission.type === '10jobs'))
      localStorage.setItem('missions', JSON.stringify(newMissions))

    }
  })

  // effects
  React.useEffect(() => {

    if (data?.missions) {
      setStateMissions(data.missions.filter((mission: any) => mission.type === '10jobs'))
    }
  }, [data])


  // helpers
  function handleClick() {
    addList10JobOffersMission({ variables: { type: '10jobs', gameId: game.id, } })
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
                query: GET_MISSION_CLIENT,
                data: {
                  mission,
                }
              })
              localStorage.setItem('mission', JSON.stringify(mission))
            }}>
              <p>{mission.type}</p>
            </Link>
            <p>Progress: {mission.progress || 0}/10</p>

            {mission.isReviewed && mission.status !== 'completed' && <p>Under review</p>}
            {mission.status === 'completed' && (
              <div>
                <p>Mission completed</p>
                <p>Score: {mission.score}</p>
              </div>
            )}
          </div>
        )
        )}
        <button onClick={handleClick}>Start "List 10 job offers" mission</button>
      </div>
      <Contact />
    </div>
  )
}

export default ListMissions;