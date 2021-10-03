import { Server, FlatFile, Origins } from 'boardgame.io/server'
import { AllPickGame } from './src/games/AP'
import { SingleDraftGame } from './src/games/SD'
import { CaptainsDuelGame } from './src/games/CD'

const server = Server({
  // Provide the definitions for your game(s).
  games: [SingleDraftGame, AllPickGame, CaptainsDuelGame],

  // Provide the database storage class to use.
  db: new FlatFile({
    dir: './storage',
    logging: false,
    ttl: 60 * 60 * 1000,
  }),

  origins: [
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT,
  ],
})

server.run(8000)
