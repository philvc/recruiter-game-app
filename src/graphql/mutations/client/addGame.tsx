import gql from 'graphql-tag';


export const ADDGAME_MUTATION = gql`
  mutation addGame($title: String){
    addGame(input: {title: $title}) @client{
      id
      title
    }
  }
`