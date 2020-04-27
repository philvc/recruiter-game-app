import gql from 'graphql-tag';

export const GET_DOCUMENT_URL_SERVER = gql`
  query getDocumentUrl($jobId: String){
    document(input: {jobId: $jobId})
  }
`