import { LobbyClient } from 'boardgame.io/client'

export const lobbyClient = new LobbyClient({
  server: `${process.env.VUE_APP_SERVER_PROTOCOL}://${process.env.VUE_APP_SERVER_ADDRESS}`,
})
