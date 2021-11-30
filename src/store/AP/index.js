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
  multiplayer: SocketIO({ server: `${process.env.VUE_APP_SERVER_ADDRESS}` }),
  // Match to connect to (multiplayer).
  // matchID: state.match.matchID,
  // Associate the client with a player (multiplayer).
  // playerID: state.slot.playerID,
  // The player’s authentication credentials (multiplayer).
  // credentials: state.slot.playerCredentials,
  // Set to false to disable the Debug Panel
  debug: false,
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
      apGameClient?.stop()
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
    next() {
      apGameClient.moves.NextPhase()
    },
    pick(_, id) {
      let heroes = db.slice(0)
      let hero = heroes.find((i) => i.id == id)
      let replacements = hero.ability_replace_required ? heroes.filter((i) => i.ability_replace_required == true).map((i) => i.id) : []
      apGameClient.moves.PickHero(id, replacements)
    },
    ban(_, id) {
      apGameClient.moves.BanHero(id)
    },
    random() {
      apGameClient.moves.RandomHero()
    },
    extra(_, { index, id }) {
      apGameClient.moves.PickExtra(index, id)
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
    banTimeStamp(state) {
      return state.G?.banTimeStamp
    },
    pickTimeStamp(state) {
      return state.G?.pickTimeStamp
    },
    bans(state) {
      return (
        state.G?.bans?.slice(1).map((id, i) => ({
          hero: db.find((h) => h.id == id),
          player: state.match.players[i + 1],
        })) ?? []
      )
    },
    baned(state) {
      let id = state.G?.bans[state.slot?.playerID]
      let hero = db.find((i) => i.id == id)
      return hero
    },
    picks(state) {
      return (
        state.G?.picks?.slice(1).map((id, i) => ({
          hero: db.find((h) => h.id == id),
          player: state.match.players[i + 1],
        })) ?? []
      )
    },
    picked(state) {
      let id = state.G?.picks[state.slot?.playerID]
      let hero = db.find((i) => i.id == id)
      return hero
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
    phaseBan(state) {
      return !state.ctx.gameover && state.ctx.phase == 'ban'
    },
    phasePick(state) {
      return !state.ctx.gameover && state.ctx.phase == 'pick'
    },
    phaseExtra(state) {
      return !state.ctx.gameover && state.ctx.phase == 'extra'
    },
    phaseOver(state) {
      return state.ctx.gameover
    },
    extrasFlag(state) {
      return state.G?.extra
    },
    heroes(state) {
      return (
        state.G.collection
          .filter((i) => !state.G.bans.includes(i))
          .filter((i) => !state.G.picks.includes(i))
          .map((id) => db.find((h) => h.id == id)) ?? []
      )
    },
    extraRadiantImage(state) {
      let id = state.G?.picks[11]
      let hero = db.find((h) => h.id == id)
      return hero?.image_portrait ?? 'https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg'
    },
    extraDireImage(state) {
      let id = state.G?.picks[12]
      let hero = db.find((h) => h.id == id)
      return hero?.image_portrait ?? 'https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg'
    },
    commands: (state) => {
      let cmd = 'dota_gamemode_ability_draft_set_draft_hero_and_team_clear;'
      let collection = state.G?.picks?.slice(1).map((id) => db.find((h) => h.id == id)) ?? []
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

      let collection = state.G?.picks?.slice(1).map((id) => db.find((h) => h.id == id)) ?? []
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
