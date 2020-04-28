import gql from 'graphql-tag';

const UPDATE_APPLICATIONPROOFURL_CLIENT = gql`
 mutation updateApplicationProofUrl($signedGetUrl: String, $jobId: String){
   updateApplicationProofUrl(input: {signedGetUrl: $signedGetUrl, jobId: $jobId}) @client
 }
`
export default UPDATE_APPLICATIONPROOFURL_CLIENT