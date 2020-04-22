export const updateJobs = async (state: any, apolloFunction: any) => {
  const cleanedState = state.map((job: any) => {
    delete job.__typename
    return job
  }
  )

  apolloFunction({
    variables: {
      jobs: cleanedState
    }
  })
}