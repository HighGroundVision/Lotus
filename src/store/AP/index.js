import { Client } from 'boardgame.io/client'
import { SocketIO } from 'boardgame.io/multiplayer'
import { lobbyClient } from '@/store/lobby'
import { AllPickGame } from '@/games/AP/'
import db from '@/assets/heroes.json'

const NUMBER_PLAYERS = 11

let apGameClient = new Client({
  // A game definition object.
  game: AllPickGame,
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

const AllPickCollectionStore = {
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
      const { matches } = await lobbyClient.listMatches(AllPickGame.name)
      commit('setMatches', matches)
    },
    async createMatch(_, config) {
      let collection = db.map((i) => i.id)

      const { matchID } = await lobbyClient.createMatch(AllPickGame.name, {
        numPlayers: NUMBER_PLAYERS,
        setupData: { ...config, collection },
        unlisted: false,
      })

      return matchID
    },
    exists({ state }) {
      return state.playerID && state.playerCredentials
    },
  },
}

const AllPickLobbyStore = {
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
      const match = await lobbyClient.getMatch(AllPickGame.name, matchID)
      let json = localStorage.getItem(`ap:${matchID}`)
      let existing = JSON.parse(json)
      commit('setMatch', { match, existing })
    },
    async joinSlot({ commit, state }, { playerID, playerName, data }) {
      const { playerCredentials } = await lobbyClient.joinMatch(AllPickGame.name, state.match.matchID, { playerID, playerName, data })
      let json = JSON.stringify({ playerID, playerCredentials })
      localStorage.setItem(`ap:${state.match.matchID}`, json)
      commit('joinMatch', { playerID, playerCredentials })
    },
    async leaveSlot({ commit, state }) {
      await lobbyClient.leaveMatch(AllPickGame.name, state.match.matchID, {
        playerID: state.playerID,
        credentials: state.playerCredentials,
      })
      localStorage.removeItem(`ap:${state.match.matchID}`)
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

const AllPickGameStore = {
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
      const match = await lobbyClient.getMatch(AllPickGame.name, matchID)
      let json = localStorage.getItem(`ap:${matchID}`)
      let slot = JSON.parse(json)
      commit('setMatch', { match, slot })
    },
    startClient({ commit, state }) {
      if (state.isConnected) apGameClient.stop()
      apGameClient.updateMatchID(state.match.matchID)
      apGameClient.updatePlayerID(state.slot?.playerID)
      apGameClient.updateCredentials(state.slot?.playerCredentials)
      apGameClient.subscribe((gs) => {
        if (gs) {
          commit('updateGameState', gs)
          commit('setSlots', apGameClient.matchData)
        }
      })
      apGameClient.start()
    },
    ready() {
      let timestamp = new Date(new Date().getTime() + 75000).getTime()
      apGameClient.moves.Readyup(timestamp)
    },
    pick(_, id) {
      apGameClient.moves.PickHero(id)
    },
    random() {
      apGameClient.moves.RandomHero()
    },
  },
  getters: {
    matchID(state) {
      return state.match?.matchID
    },
    playerID(state) {
      return state.slot?.playerID
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
    timestamp(state) {
      return state.G?.timestamp
    },
    selected(state) {
      let id = state.G?.selection[state.slot?.playerID]
      let hero = db.find((i) => i.id == id)
      return hero
    },
    selection(state) {
      return (
        state.G?.selection?.slice(1).map((id, i) => {
          let hero = db.find((h) => h.id == id)
          let player = state.match.players[i + 1]
          return { hero, player }
        }) ?? []
      )
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
    phasePick(state) {
      return !state.ctx.gameover && state.ctx.phase == 'pick'
    },
    phaseOver(state) {
      return state.ctx.gameover
    },
    commands: (state) => {
      let cmd = 'dota_gamemode_ability_draft_set_draft_hero_and_team_clear;'
      cmd += 'dota_gamemode_ability_draft_shuffle_draft_order 0;'
      cmd += 'dota_gamemode_ability_draft_shuffle_draft_order;'

      let collection = state.G?.selection?.slice(1).map((id) => db.find((h) => h.id == id)) ?? []
      for (let i = 0; i < collection.length; i++) {
        let hero = collection[i]
        if (hero) {
          const team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
          cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team ' + hero.key + ' ' + team + ';'
        }
      }

      cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team;'
      return cmd
    },
    launch: (state) => {
      let cmd = '-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear '
      cmd += '+dota_gamemode_ability_draft_shuffle_draft_order 0 '

      let collection = state.G?.selection?.slice(1).map((id) => db.find((h) => h.id == id)) ?? []
      for (let i = 0; i < collection.length; i++) {
        let hero = collection[i]
        if (hero) {
          const team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
          cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team ' + hero.key + ' ' + team + ';'
        }
      }
      cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team'
      return cmd
    },
  },
}

export const AllPick = {
  namespaced: true,
  modules: {
    lobbies: AllPickCollectionStore,
    lobby: AllPickLobbyStore,
    game: AllPickGameStore,
  },
}
