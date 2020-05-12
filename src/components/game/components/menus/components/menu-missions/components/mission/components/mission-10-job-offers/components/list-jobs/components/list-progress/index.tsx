import * as React from 'react';

const ListProgress = ({ jobs }: any) => {

  const completedJob = jobs.filter((job: any) => job.url !== "" && job.name !== "").length

  return (
    <div>
      <p>{completedJob}/10</p>
    </div>
  )
}

export default ListProgress;