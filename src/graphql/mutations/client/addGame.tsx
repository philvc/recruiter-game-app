import gql from 'graphql-tag';


export const ADDGAME_CLIENT = gql`
  mutation addGame($title: String, $recruiterId: String){
    addGame(input: {title: $title, recruiterId: $recruiterId}) @client{
      id
      title
      recruiterId
      applicantId
      missionsAccomplished
    }
  }
`