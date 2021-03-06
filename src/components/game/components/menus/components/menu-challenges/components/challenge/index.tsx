import * as React from 'react';

// components
import NavBar from '../../../../../../../navbar';
import NewChallenge from './components/newChallenge';
import PendingChallenge from './components/pendingChallenge';
import CompletedChallenge from './components/completedChallenge';
import Contact from '../../../../../../../contact';

// styles
import './styles.css';

// apollo
import { useApolloClient, gql } from '@apollo/client';


const Challenge = ({ path }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({
    query: gql`
     {
       mission{
         status
       }
     }
    `,
  })


  const renderChallenge = (status: string) => {
    switch (status) {
      case 'new':
        return <NewChallenge />;
      case 'pending':
        return <PendingChallenge />;
      case 'completed':
        return <CompletedChallenge />;
      default:
        return null;
    }
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className='challenge-applyForOneJob-body'>
        <h3>Apply for 1 job</h3>
        {renderChallenge(mission?.status)}
        <Contact />
      </div>
    </div>
  )
}

export default Challenge;