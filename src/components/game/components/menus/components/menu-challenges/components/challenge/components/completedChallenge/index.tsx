import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// styles
import './styles.css';

// apollo
import { GET_MISSION_CLIENT } from '../../../../../../../../../../graphql/queries/client/getMissionClient';

const CompletedChallenge = () => {

  // client
  const client = useApolloClient();
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })

  return (
    <div className='completedChallenge-container'>
      <p className='completedChallenge-container-p'>{mission.selectedJob.name}</p>
      <p className='completedChallenge-container-p'>
        <a style={{ color: '#0000EE', textDecoration: 'none' }} href={mission.selectedJob?.url} target="_blank">
          {mission.selectedJob?.url}
        </a>
      </p>
      {mission.score === 0 ?
        (<p>Challenge failed but you can still select this job offer for a next challenge</p>)
        :
        (<img className='completedChallenge-container-img' src={mission.selectedJob.applicationProofUrl} alt='application screenshot' />)
      }
    </div>
  )
}

export default CompletedChallenge;