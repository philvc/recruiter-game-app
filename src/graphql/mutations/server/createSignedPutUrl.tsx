import gql from 'graphql-tag';

export const CREATE_SIGNED_PUT_URL = gql`
  mutation createSignedPutUrl($fileName: String!, $mimeType: String!, $jobId: String) {
    createSignedPutUrl(input: { fileName: $fileName, mimeType: $mimeType, jobId: $jobId }){
      signedPutUrl
      signedGetUrl
    }
  }
`;