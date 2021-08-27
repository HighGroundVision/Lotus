import { Client, LobbyClient } from 'boardgame.io/client'
// import db from '@/assets/heroes.json'
import { SingleDraftGame } from '@/games/SD/'
const GameName = SingleDraftGame.name

export const SingleDraft = {
  namespaced: true,
  state: () => {
    let data = {
      lobby: new LobbyClient({ server: 'http://localhost:8000' }),
      client: null,
      matches: [],
      credentials: null,
      playerId: null,
      matchId: null,
      G: null,
      ctx: null,
      isActive: false,
      isConnected: false,
      log: [],
    }
    return data
  },
  mutations: {
    setMatches(state, matches) {
      //console.log(matches)
      state.matches = matches
    },
    joinGame(state, { client, matchID, playerID, credentials }) {
      state.client = client
      state.matchId = matchID
      state.playerId = playerID
      state.credentials = credentials
    },
    updateGame(state, { G, ctx, isActive, isConnected, log }) {
      console.log('state', { G, ctx, isActive, isConnected, log })
      state.G = Object.freeze(G)
      state.ctx = Object.freeze(ctx)
      ;(state.isActive = isActive), (state.isConnected = isConnected), (state.log = log)
    },
    leaveGame(state) {
      state.client = null
      state.matchId = null
      state.playerId = null
      state.credentials = null
      state.G = null
      state.ctx = null
      state.isActive = false
      state.isConnected = false
      state.log = []
    },
  },
  actions: {
    async findMatches({ commit, state }) {
      const { matches } = await state.lobby.listMatches(GameName)
      commit('setMatches', matches)
    },
    async createMatch({ state }, config) {
      const { matchId } = await state.lobby.createMatch(GameName, {
        numPlayers: 10,
        setupData: { ...config },
        unlisted: false,
      })

      return matchId
    },
    async joinMatch({ dispatch, commit, state }, { matchID, playerID, playerName }) {
      const { playerCredentials } = await state.lobby.joinMatch(GameName, matchID, { playerID, playerName })

      await dispatch('leaveMatch')

      let config = {
        // A game definition object.
        game: SingleDraftGame,
        // The number of players.
        numPlayers: 10,
        // Set this to one of the following to enable multiplayer: SocketIO / Local / false
        multiplayer: false,
        // Match to connect to (multiplayer).
        matchID: matchID,
        // Associate the client with a player (multiplayer).
        playerID: playerID,
        // The player’s authentication credentials (multiplayer).
        credentials: playerCredentials,
        // Set to false to disable the Debug Panel
        debug: false,
        // Add a Redux enhancer to the internal store.
        //enhancer: enhancer,
      }

      let client = Client(config)

      client.subscribe(() => commit('updateGame', client.getState()))

      commit('joinGame', { client, matchID, playerID, credentials: playerCredentials })

      client.start()
    },
    async leaveMatch({ commit, state }) {
      if (state.matchId) {
        await state.lobby.leaveMatch(GameName, state.matchId, {
          playerID: state.playerId,
          credentials: state.credentials,
        })

        state.client?.stop()

        commit('leaveGame')
      }
    },
  },
  getters: {
    players({ state }) {
      return state.client?.matchData
    },
  },
}
