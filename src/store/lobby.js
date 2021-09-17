import { LobbyClient } from 'boardgame.io/client'

export const lobbyClient = new LobbyClient({
  server: 'http://localhost:8000',
})
