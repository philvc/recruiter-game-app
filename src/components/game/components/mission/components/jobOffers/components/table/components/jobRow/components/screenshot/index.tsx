import * as React from 'react';

// modules
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQuery } from '@apollo/client';

// graphql
import { CREATE_SIGNED_URL } from '../../../../../../../../../../../../graphql/mutations/server/createSignedUrl';
import { GET_DOCUMENT_URL_SERVER } from '../../../../../../../../../../../../graphql/queries/server/getDocumentUrl';


const Screenshot = ({ jobId, missionId }: any) => {
  const { loading, error, data } = useQuery(GET_DOCUMENT_URL_SERVER, { variables: { jobId } })
  const [file, setFile] = React.useState('')
  const [createSignedUrl] = useMutation(CREATE_SIGNED_URL, {
    update(cache, { data: { createSignedUrl } }) {
      const { signedGetUrl } = createSignedUrl;
      console.log(signedGetUrl)
      cache.writeQuery({
        query: GET_DOCUMENT_URL_SERVER,
        variables: { jobId },
        data: { document: signedGetUrl }
      })
    },
  })


  const onDrop = React.useCallback(async acceptedFiles => {
    // Do something with the files
    const { name, type } = acceptedFiles[0]
    setFile(name)
    // create signed url

    const { data } = await createSignedUrl({
      variables: {
        fileName: name,
        mimeType: type,
        jobId
      }
    })
    // axios.put(signedUrl, file)
    const headers = {
      'Content-Type': acceptedFiles[0].type,
      'X-AMZ-SERVER-SIDE-ENCRYPTION': 'AES256',
      'Access-Control-Allow-Origin': '*',

    };

    await axios.put(data.createSignedUrl.signedPutUrl, acceptedFiles[0], { headers });

    // getmethod
  }, [createSignedUrl, jobId])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  if (loading) return null

  if (error) return null

  const { document } = data
  console.log('doucment url :', document)

  return (
    <div>
      <img src={document} alt='no proof given ' />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <div>{file}</div>
    </div>
  )
}

export default Screenshot;

