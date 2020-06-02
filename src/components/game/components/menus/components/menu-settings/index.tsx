import * as React from 'react';

// modules

// components
import NavBar from '../../../../../navbar';
import Profile from './profile';
import ApplicantDetails from './applicant-details';
import Contact from '../../../../../contact';
import RecruiterDetails from './recruiter-details';
import GameDetails from './game-details';

// styles
import './styles.css'

// apollo


const Settings = ({ path }: any) => {


  return (
    <div>
      <NavBar />
      <Profile />
      <GameDetails />
      <ApplicantDetails />
      <RecruiterDetails />
      <Contact />
    </div>
  )
}

export default Settings;