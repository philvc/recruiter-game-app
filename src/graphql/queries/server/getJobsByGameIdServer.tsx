import gql from 'graphql-tag';

// fragment
import { JOB_DATA_FRAGMENT } from '../../fragments/jobDataFragment';

export const GET_JOBS_BY_GAME_ID_SERVER = gql`
  query getJobsByGameId($gameId: String){
    getJobsByGameId(input: {gameId: $gameId}){
      ...JobData
    }
  }
  ${JOB_DATA_FRAGMENT}
`