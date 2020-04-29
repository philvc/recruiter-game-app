
import { GET_JOBS_SERVER } from '../queries/server/getJobsServer'

export const resolvers: any = {

  Mutation: {
    updateApplicationProofUrl: (__: any, { input }: any, { cache, getCacheKey }: any) => {
      const { jobId, signedGetUrl } = input
      const { jobs }: any = cache.readQuery({ query: GET_JOBS_SERVER, variables: { missionId: '5ea7c6537f3b8d425e90c163' } })
      cache.writeQuery({
        query: GET_JOBS_SERVER,
        variables: { missionId: "5ea7c6537f3b8d425e90c163" },
        data: [...jobs]
      })
      // const id = cache.identify({
      //   __typename: 'Job',
      //   id: jobId
      // })
      // console.log('id', id)
      // cache.modify(id, {applicationProofUrl: signedGetUrl})
    }
  },
}
