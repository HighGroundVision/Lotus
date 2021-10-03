import { Client } from 'boardgame.io/client'
import { SocketIO } from 'boardgame.io/multiplayer'
import { lobbyClient } from '@/store/lobby'
import { CaptainsDuelGame } from '@/games/CD/'
// import db from '@/assets/heroes.json'

const NUMBER_PLAYERS = 3

let cdGameClient = new Client({
  // A game definition object.
  game: CaptainsDuelGame,
  // The number of players.
  numPlayers: NUMBER_PLAYERS,
  // Set this to one of the following to enable multiplayer: SocketIO / Local / false
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  // Match to connect to (multiplayer).
  // matchID: state.match.matchID,
  // Associate the client with a player (multiplayer).
  // playerID: state.slot.playerID,
  // The player’s authentication credentials (multiplayer).
  // credentials: state.slot.playerCredentials,
  // Set to false to disable the Debug Panel
  debug: true,
  // Add a Redux enhancer to the internal store.
  // enhancer: enhancer,
})

const CaptainsDuelCollectionStore = {
  namespaced: true,
  state: () => {
    let data = {
      matches: [],
    }
    return data
  },
  mutations: {
    setMatches(state, matches) {
      state.matches = matches
    },
  },
  actions: {
    async findMatches({ commit }) {
      const { matches } = await lobbyClient.listMatches(CaptainsDuelGame.name)
      commit('setMatches', matches)
    },
    async createMatch(_, { name, sequence }) {
      let collection = sequence.map((i) => ({ stage: i.stage, team: i.team, choice: null, start: null, end: null, delta: 0.0 }))

      const { matchID } = await lobbyClient.createMatch(CaptainsDuelGame.name, {
        numPlayers: NUMBER_PLAYERS,
        setupData: { name, sequence: collection },
        unlisted: false,
      })

      return matchID
    },
    exists({ state }) {
      return state.playerID && state.playerCredentials
    },
  },
}

const CaptainsDuelLobbyStore = {
  namespaced: true,
  state: () => {
    let data = {
      match: null,
      playerID: null,
      playerCredentials: null,
    }
    return data
  },
  mutations: {
    setMatch(state, { match, existing }) {
      state.match = match
      state.playerID = existing?.playerID
      state.playerCredentials = existing?.playerCredentials
    },
    joinMatch(state, { playerID, playerCredentials }) {
      state.playerID = playerID
      state.playerCredentials = playerCredentials
    },
    leaveSlot(state) {
      state.playerID = null
      state.playerCredentials = null
    },
  },
  actions: {
    async loadMatch({ commit }, matchID) {
      const match = await lobbyClient.getMatch(CaptainsDuelGame.name, matchID)
      let json = localStorage.getItem(`ap:${matchID}`)
      let existing = JSON.parse(json)
      commit('setMatch', { match, existing })
    },
    async joinSlot({ commit, state }, { playerID, playerName, data }) {
      const { playerCredentials } = await lobbyClient.joinMatch(CaptainsDuelGame.name, state.match.matchID, { playerID, playerName, data })
      let json = JSON.stringify({ playerID, playerCredentials })
      localStorage.setItem(`ap:${state.match.matchID}`, json)
      commit('joinMatch', { playerID, playerCredentials })
    },
    async leaveSlot({ commit, state }) {
      await lobbyClient.leaveMatch(CaptainsDuelGame.name, state.match.matchID, {
        playerID: state.playerID,
        credentials: state.playerCredentials,
      })
      localStorage.removeItem(`ap:${state.match.matchID}`)
      cdGameClient?.stop()
      commit('leaveSlot')
    },
  },
  getters: {
    matchID(state) {
      return state.match?.matchID
    },
    players(state) {
      return state.match?.players ?? []
    },
    data(state) {
      return state.match?.setupData
    },
    existing(state) {
      return state.playerID && state.playerCredentials
    },
  },
}

const CaptainsDuelGameStore = {
  namespaced: true,
  state: () => {
    let data = {
      match: null,
      slot: null,
      G: null,
      ctx: null,
      isActive: false,
      isConnected: false,
      log: [],
    }
    return data
  },
  mutations: {
    setMatch(state, { match, slot }) {
      state.match = match
      state.slot = slot
    },
    setSlots(state, slots) {
      state.match.players = slots
    },
    updateGameState(state, { G, ctx, isActive, isConnected, log }) {
      state.G = Object.freeze(G)
      state.ctx = Object.freeze(ctx)
      state.isActive = isActive
      state.isConnected = isConnected
      state.log = log
    },
  },
  actions: {
    async loadMatch({ commit }, matchID) {
      const match = await lobbyClient.getMatch(CaptainsDuelGame.name, matchID)
      let json = localStorage.getItem(`ap:${matchID}`)
      let slot = JSON.parse(json)
      commit('setMatch', { match, slot })
    },
    startClient({ commit, state }) {
      if (state.isConnected) cdGameClient.stop()
      cdGameClient.updateMatchID(state.match.matchID)
      cdGameClient.updatePlayerID(state.slot?.playerID)
      cdGameClient.updateCredentials(state.slot?.playerCredentials)
      cdGameClient.subscribe((gs) => {
        if (gs) {
          commit('updateGameState', gs)
          commit('setSlots', cdGameClient.matchData)
        }
      })
      cdGameClient.start()
    },
    next() {
      cdGameClient.moves.NextPhase()
    },
    choice(id) {
      cdGameClient.moves.MakeChoice(id)
    },
  },
  getters: {
    matchID(state) {
      return state.match?.matchID
    },
    playerID(state) {
      return state.slot?.playerID
    },
    activePlayer(state) {
      return state.ctx.currentPlayer
    },
    isHost(state) {
      return state.slot?.playerID == 0
    },
    isPlayer(state) {
      return state.slot?.playerID > 0
    },
    isSpectator(state) {
      return state.slot == null
    },
    phase(state) {
      if (state.ctx.gameover) {
        return 'done'
      } else {
        return state.ctx.phase
      }
    },
    phaseReady(state) {
      return !state.ctx.gameover && state.ctx.phase == 'ready'
    },
    phaseDraft(state) {
      return !state.ctx.gameover && state.ctx.phase == 'draft'
    },
    phaseOver(state) {
      return state.ctx.gameover
    },
    stage(state) {
      let turn = state.ctx.turn - 3
      let current = state.G.sequence[turn]
      return current.stage
    },
    stageBan(state) {
      debugger
      let turn = state.ctx.turn - 3
      let current = state.G.sequence[turn]
      return current.stage == 'ban'
    },
    stagePick(state) {
      let turn = state.ctx.turn - 3
      let current = state.G.sequence[turn]
      return current.stage == 'pick'
    },
    radiantTimeUsage(state) {
      let amount = state.G.sequence
        .filter((i) => i.team == '1')
        .map((i) => i.delta)
        .reduce((total, i) => total + i)
      return amount
    },
    direTimeUsage(state) {
      let amount = state.G.sequence
        .filter((i) => i.team == '2')
        .map((i) => i.delta)
        .reduce((total, i) => total + i)
      return amount
    },
    lastestTimestamp(state) {
      return state.G.ts
    },
    sequence(state) {
      return state.G.sequence
    },
    commands: (/* state */) => {
      let cmd = 'dota_gamemode_ability_draft_set_draft_hero_and_team_clear;'
      cmd += 'dota_gamemode_ability_draft_shuffle_draft_order 0;'
      cmd += 'dota_gamemode_ability_draft_shuffle_draft_order;'

      // let collection = state.G?.picks?.slice(1).map((id) => db.find((h) => h.id == id)) ?? []
      // for (let i = 0; i < collection.length; i++) {
      //   let hero = collection[i]
      //   if (hero) {
      //     const team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
      //     cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team ' + hero.key + ' ' + team + ';'
      //   }
      // }

      cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team;'
      return cmd
    },
    launch: (/* state */) => {
      let cmd = '-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear '
      cmd += '+dota_gamemode_ability_draft_shuffle_draft_order 0 '

      // let collection = state.G?.picks?.slice(1).map((id) => db.find((h) => h.id == id)) ?? []
      // for (let i = 0; i < collection.length; i++) {
      //   let hero = collection[i]
      //   if (hero) {
      //     const team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
      //     cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team ' + hero.key + ' ' + team + ';'
      //   }
      // }

      cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team'
      return cmd
    },
  },
}

export const CaptainsDuel = {
  namespaced: true,
  modules: {
    lobbies: CaptainsDuelCollectionStore,
    lobby: CaptainsDuelLobbyStore,
    game: CaptainsDuelGameStore,
  },
}
