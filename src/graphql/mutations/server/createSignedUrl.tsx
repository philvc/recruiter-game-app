import gql from 'graphql-tag';

export const CREATE_SIGNED_URL = gql`
  mutation createSignedUrl($fileName: String!, $mimeType: String!) {
    createSignedUrl(input: { fileName: $fileName, mimeType: $mimeType }) 
  }
`;