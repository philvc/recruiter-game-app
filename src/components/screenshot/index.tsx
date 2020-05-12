import * as React from 'react';

import axios from 'axios';
import { useMutation, useApolloClient, gql } from '@apollo/client';



// components
import DropZone from '../dropzone';
import { CREATE_SIGNED_PUT_URL } from '../../graphql/mutations/server/createSignedPutUrl';
import { UPDATE_JOB_SERVER } from '../../graphql/mutations/server/updateJobServer';
import { GET_MISSION_CLIENT } from '../../graphql/queries/client/getMissionClient';

const Screenshot = ({ openModal }: any) => {

  // client
  const client = useApolloClient()
  const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
  const { selectedJob } = mission

  // state
  const [imageSource, setImageSource] = React.useState(selectedJob.applicationProofUrl)
  const [file, setFile] = React.useState({ type: '', name: '' })
  const [isLoaded, setIsLoaded] = React.useState(false)

  // mutations
  const [createSignedPutUrl, { loading, error, data }] = useMutation(CREATE_SIGNED_PUT_URL)
  const [updateJob] = useMutation(UPDATE_JOB_SERVER, {
    onCompleted({ updateJob }) {
      const { mission }: any = client.readQuery({ query: GET_MISSION_CLIENT })
      localStorage.setItem('mission', JSON.stringify(mission))
    }
  })

  // helpers

  // createSignedPutUrl
  function handleCreateSignedPutUrl(file: any) {
    setFile(file)
    createSignedPutUrl({
      variables: {
        fileName: file.name,
        mimeType: file.type,
        jobId: selectedJob.id
      }
    })

  }


  async function handleSaveDocument() {

    // axios headers
    const headers = {
      'Content-Type': file.type,
      'X-AMZ-SERVER-SIDE-ENCRYPTION': 'AES256',
      'Access-Control-Allow-Origin': '*',

    };

    // post document in aws S3
    await axios.put(data.createSignedPutUrl.signedPutUrl, file, { headers });

    // update job with SignedGetUrl
    updateJob({
      variables: {
        id: selectedJob.id,
        field: 'applicationProofUrl',
        data: data.createSignedPutUrl.signedGetUrl
      }
    })

    // close modal
    return openModal()
  }



  return (
    <div>
      <img style={isLoaded ? {} : { display: 'none' }} src={imageSource} alt='no uploaded document' onLoad={() => setIsLoaded(true)} />
      {!isLoaded && selectedJob.applicationProofUrl && <p>Loading Image ...</p>}
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
export default Screenshot;