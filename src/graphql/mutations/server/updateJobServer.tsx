import gql from 'graphql-tag';

// fragment
import { JOB_DATA_FRAGMENT } from '../../fragments/jobDataFragment';

export const UPDATE_JOB_SERVER = gql`
  mutation updateJob(
    $id: String,
    $data: StringOrIntOrBoolean,
    $field: String,
    ){
    updateJob(input: 
    {
        id: $id,
        field: $field,
        data: $data
    })
      {
        ...JobData
    }
  }
  ${JOB_DATA_FRAGMENT}
`