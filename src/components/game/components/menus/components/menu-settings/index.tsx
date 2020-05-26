import * as React from 'react';

// modules

// components
import NavBar from '../../../../../navbar';
import Profile from './profile';
import ApplicantDetails from './applicant-details';
import Contact from '../../../../../contact';

// styles
import './styles.css'

// apollo


const Settings = ({ path }: any) => {


  return (
    <div>
      <NavBar />
      <Profile />
      <ApplicantDetails />
      <Contact />
    </div>
  )
}

export default Settings;