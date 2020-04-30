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

const ListMissions = ({ path, gameId, navigate }: any) => {
  const client = useApolloClient()
  const { loading, error, data } = useQuery(GET_MISSIONS_SERVER, { variables: { gameId } })
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
    // onCompleted({ addMission }) {
    //   // navigate(`10jobs/${addMission.id}`)
    // }
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
          <h3>Mission</h3>
        </div>
        {data && data.missions.map((mission: any) => (
          <div key={mission.id}>
            <Link to={`10jobs/${mission.id}`} onClick={() => {
              client.writeQuery({
                query: gql`{
                  missionId
                }`,
                data: {
                  missionId: mission.id
                }
              })
            }}>
              <p>{mission.type}</p>
            </Link>
          </div>
        )
        )}
        <button onClick={handleClick}>Start "List 10 job offers" mission</button>
      </div>
    </div>
  )
}

export default ListMissions;