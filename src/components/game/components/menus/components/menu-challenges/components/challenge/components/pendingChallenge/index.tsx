import * as React from 'react';
import Countdown from '../countdown';
import Modal from '../../../../../../../../../modal';

const PendingChallenge = ({ selectedJob, missionTime, missionId }: any) => {
  return (
    <div>
      <p><a href={selectedJob?.url}>{selectedJob?.url}</a></p>
      <Countdown missionTime={missionTime} />
      <Modal
        applicationProofUrl={selectedJob?.applicationProofUrl}
        jobId={selectedJob?.id}
        missionId={missionId}
        openButton={selectedJob?.applicationProofUrl ? 'View' : 'Upload'}
      />
    </div>
  )
}

export default PendingChallenge;