
export const updateJobs = async (state: any, apolloFunction: any) => {
  console.log('state helper :', state)
  const cleanedState = state.map((job: any) => {
    delete job.__typename
    return job
  }
  )

  console.log('cleanedState ', cleanedState)

  apolloFunction({
    variables: {
      jobs: cleanedState
    }
  })
}