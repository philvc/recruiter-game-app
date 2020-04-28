import * as React from 'react';

// components
import Screenshot from '../screenshot';

const UploadForm = ({ openModal, applicationProofUrl }: any) => {
  const [isUploading, setIsUpoading] = React.useState(false)
  return (
    <div>
      <img src={applicationProofUrl} alt='no uploaded document' />
      <Screenshot missionId='5ea7c6537f3b8d425e90c163' jobId='5ea7c6537f3b8d425e90c164' />
      <button id='go-back-button' onClick={openModal} disabled={!isUploading}>Go Back</button>
    </div>
  )
}

export default UploadForm;