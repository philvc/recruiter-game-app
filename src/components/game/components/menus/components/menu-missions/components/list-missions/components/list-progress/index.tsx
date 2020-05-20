import * as React from 'react';

// modules

// component
import ReviewButton from './components/review-button';

// apollo

const ListProgress = ({ mission }: any) => {

  // client

  return (
    <div>
      <p>{mission.progress || 0}/10 <span>{mission.progress === 10 ? 'list completed' : null}</span></p>
      {mission.progress === 10 && !mission.isReviewed && <ReviewButton />}
    </div>
  )
}

export default ListProgress;