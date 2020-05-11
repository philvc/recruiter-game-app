import * as React from 'react';

// packages
import axios from 'axios';
import { useMutation } from '@apollo/client';



// components
import DropZone from '../dropzone';
import { CREATE_SIGNED_PUT_URL } from '../../graphql/mutations/server/createSignedPutUrl';
import { UPDATE_JOB_SERVER } from '../../graphql/mutations/server/updateJobServer';

// graphql


const UploadForm = ({ openModal, applicationProofUrl, jobId }: any) => {

  const [imageSource, setImageSource] = React.useState(applicationProofUrl)
  const [file, setFile] = React.useState({ type: '', name: '' })
  const [isLoaded, setIsLoaded] = React.useState(false)

  const [createSignedPutUrl, { loading, error, data }] = useMutation(CREATE_SIGNED_PUT_URL)
  const [updateJob] = useMutation(UPDATE_JOB_SERVER)


  function handleCreateSignedPutUrl(file: any) {
    setFile(file)
    createSignedPutUrl({
      variables: {
        fileName: file.name,
        mimeType: file.type,
        jobId
      }
    })

  }

  async function handleSaveDocument() {
    const headers = {
      'Content-Type': file.type,
      'X-AMZ-SERVER-SIDE-ENCRYPTION': 'AES256',
      'Access-Control-Allow-Origin': '*',

    };

    await axios.put(data.createSignedPutUrl.signedPutUrl, file, { headers });
    updateJob({
      variables: {
        id: jobId,
        field: 'applicationProofUrl',
        data: data.createSignedPutUrl.signedGetUrl
      }
    })
    return openModal()
  }



  return (
    <div>
      <img style={isLoaded ? {} : { display: 'none' }} src={imageSource} alt='no uploaded document' onLoad={() => setIsLoaded(true)} />
      {!isLoaded && applicationProofUrl && <p>Loading Image ...</p>}
      <DropZone
        handleCreateSignedPutUrl={handleCreateSignedPutUrl}
      />
      {file.name && (
        <p>{file.name}</p>
      )}
      <button id='go-back-button' onClick={openModal} disabled={loading}>Go Back</button>
      {file.name && (
        <button onClick={handleSaveDocument} disabled={loading}>Save</button>
      )}
    </div>
  )
}

export default UploadForm;