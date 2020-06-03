import * as React from 'react';

// modules
import { useApolloClient } from '@apollo/client';

// components
import NavBar from '../../../../../navbar';
import Profile from './profile';
import ApplicantDetails from './applicant-details';
import Contact from '../../../../../contact';
import RecruiterDetails from './recruiter-details';
import GameDetails from './game-details';

// styles
import './styles.css'
import { GET_GAME_CLIENT } from '../../../../../../graphql/queries/client/getGameClient';
import { GET_PLAYER_CLIENT } from '../../../../../../graphql/queries/client/getPlayerClient';

// apollo


const Settings = ({ path }: any) => {

  // client
  const client = useApolloClient()
  const { game }: any = client.readQuery({ query: GET_GAME_CLIENT })
  const { player }: any = client.readQuery({ query: GET_PLAYER_CLIENT })

  const { applicant } = game;
  return (
    <div>
      <NavBar />
      <Profile />
      <GameDetails />
      {player.id === applicant.id ? (

        <RecruiterDetails />
      )
        :
        (
          <ApplicantDetails />
        )
      }
      <Contact />
    </div>
  )
}

export default Settings;