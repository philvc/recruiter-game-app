import { GET_MISSIONS_SERVER } from "../queries/server/getMissionsServer"


export const resolvers: any = {
  Query: {
    mission: (__: any, { input }: any, { cache }: any) => {
      const { missionId } = input
      console.log('mission query resolver')

      const { missions } = cache.readQuery({
        query: GET_MISSIONS_SERVER,
        variables: {
          gameId: '5e9d61324ef4e442e0bcc333',
        }
      })
      const index = missions.findIndex((mission: any) => mission.id === missionId)
      return missions[index]
    }
  },
  Mutation: {

  },
}
