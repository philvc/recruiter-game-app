import gql from 'graphql-tag';

export const CREATE_SIGNED_URL = gql`
  mutation createSignedUrl($fileName: String!, $mimeType: String!, $jobId: String) {
    createSignedUrl(input: { fileName: $fileName, mimeType: $mimeType, jobId: $jobId }) 
  }
`;