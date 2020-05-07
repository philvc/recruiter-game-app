import * as React from 'react';
import { calculateCountDown } from './helper'

const Countdown = ({ missionTime }: any) => {
  const [countdown, setCountDown] = React.useState('');

  if (countdown !== 'EXPIRED') {
    calculateCountDown(parseInt(missionTime, 10), setCountDown)

  }
  return (
    <p>{countdown}</p>
  )
}

export default Countdown;