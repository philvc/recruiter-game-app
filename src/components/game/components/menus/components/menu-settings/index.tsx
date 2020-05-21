import * as React from 'react';

// modules

// components
import NavBar from '../../../../../navbar';
import Profile from './profile';
import ApplicantDetails from './applicant-details';

// styles
import './styles.css'

// apollo


const Settings = ({ path }: any) => {


  return (
    <div>
      <NavBar />
      <Profile />
      <ApplicantDetails />
    </div>
  )
}

export default Settings;