

export const resolvers: any = {

  Mutation: {
    updateApplicationProofUrl: (__root: any, { jobId }: any, { cache }: any) => {
      const id = cache.identify({
        __typename: 'Job',
        id: jobId
      })
      console.log('id', id)
      return ''
    },
    updatePlayer: () => {
      console.log('updatePlayer mutation resolver')
    }
  },
}
