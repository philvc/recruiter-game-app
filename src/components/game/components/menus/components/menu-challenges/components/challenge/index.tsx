import * as React from 'react';

// components
import NavBar from '../../../../../../../navbar';
import NewChallenge from './components/newChallenge';
import PendingChallenge from './components/pendingChallenge';

// apollo
import { useApolloClient, gql } from '@apollo/client';
import CompletedChallenge from './components/completedChallenge';


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
      Challenge
      {renderChallenge(mission?.status)}
    </div>
  )
}

export default Challenge;