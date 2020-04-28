import * as React from 'react';

// packages
import axios from 'axios';
import { useMutation} from '@apollo/client';



// components
import DropZone from '../dropzone';

// graphql
import { CREATE_SIGNED_PUT_URL } from '../../../../../../../../../../../../graphql/mutations/server/createSignedPutUrl';


const UploadForm = ({ openModal, applicationProofUrl, jobId, missionId }: any) => {

  const [imageSource, setImageSource] = React.useState(applicationProofUrl)
  const [file, setFile] = React.useState({
    type:'',
    name:''
  })


  // create signed url function
  const [createSignedPutUrl, {loading, error, data}] = useMutation(CREATE_SIGNED_PUT_URL)

  function handleCreateSignedPutUrl(file:any){
    setFile(file)
    createSignedPutUrl({variables:{
      fileName: file.name,
      mimeType: file.type,
      jobId
    }})

  }

  async function handleSaveDocument() {
    const headers = {
      'Content-Type': file.type,
      'X-AMZ-SERVER-SIDE-ENCRYPTION': 'AES256',
      'Access-Control-Allow-Origin': '*',

    };

    await axios.put(data.createSignedPutUrl, file, { headers });
    return openModal()
  }


  
  return (
    <div>
      <img src={imageSource} alt='no uploaded document' />
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