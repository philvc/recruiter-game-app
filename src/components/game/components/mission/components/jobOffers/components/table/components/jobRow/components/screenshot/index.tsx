import * as React from 'react';

// modules
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/react-hooks';

// graphql
import { CREATE_SIGNED_URL } from '../../../../../../../../../../../../graphql/mutations/server/createSignedUrl';
import { UPDATE_APPLICATIONPROOFURL_CLIENT } from '../../../../../../../../../../../../graphql/mutations/client/updateApplicationProofUrl';


const Screenshot = ({ jobId, missionId, applicationProofUrl }: any) => {
  const [applicationProofImgSrc, setapplicationProofImgSrc] = React.useState(applicationProofUrl)
  const [file, setFile] = React.useState('')
  const [updateApplicationProofUrl, { loading, error, data }] = useMutation(UPDATE_APPLICATIONPROOFURL_CLIENT, { variables: { jobId } })
  const [createSignedUrl] = useMutation(CREATE_SIGNED_URL, {
    // update(cache) {
    //   const { jobs }: any = cache.readQuery({ query: GET_JOBS_SERVER, variables: { missionId } })
    //   cache.writeQuery({
    //     query: GET_JOBS_SERVER,
    //     variables: { missionId },
    //     data: {
    //       jobs: [...jobs]
    //     }
    //   })
    // },
    onCompleted() {
      updateApplicationProofUrl()
    }
  })

  React.useEffect(() => {
    if (error) {
      return console.log('Error applicationUrl :', error)
    }
    if (data) {
      console.log('data', data)
      // return setapplicationProofImgSrc(data.applicationProofUrl)
    }
  }, [data, error])

  const onDrop = React.useCallback(async acceptedFiles => {
    // Do something with the files
    const { name, type } = acceptedFiles[0]
    console.log('input', name, type)
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

    await axios.put(data.createSignedUrl, acceptedFiles[0], { headers });

    // getmethod
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
      <img src={applicationProofImgSrc} alt='no proof given ' />
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

