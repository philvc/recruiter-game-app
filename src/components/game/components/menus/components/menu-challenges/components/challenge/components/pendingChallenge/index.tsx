import * as React from 'react';
import Countdown from '../countdown';
import ApplicationProofModal from '../../../../../../../../../application-proof-modal';

const PendingChallenge = ({ status, selectedJob, missionTime, missionId }: any) => {
  return (
    <div>
      <p><a href={selectedJob?.url}>{selectedJob?.url}</a></p>
      <Countdown missionTime={missionTime} />
      <ApplicationProofModal
        applicationProofUrl={selectedJob?.applicationProofUrl}
        jobId={selectedJob?.id}
        missionId={missionId}
      />
    </div>
  )
}

export default PendingChallenge;