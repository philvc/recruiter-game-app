import * as React from 'react';

// modules

// component

// apollo

const ListProgress = ({ mission }: any) => {

  // client

  return (
    <div>
      <p>{mission.progress || 0}/10 <span>{mission.progress === 10 ? 'list completed' : null}</span></p>
    </div>
  )
}

export default ListProgress;