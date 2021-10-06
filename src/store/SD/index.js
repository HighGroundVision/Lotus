import { Client } from 'boardgame.io/client'
import { SocketIO } from 'boardgame.io/multiplayer'
import { lobbyClient } from '@/store/lobby'
import { SingleDraftGame } from '@/games/SD/'
import { shuffleArray } from '@/store/shuffle'
import db from '@/assets/heroes.json'

function getShuffledHeroes(attribute) {
  let heroes = db.slice(0).filter((_) => _.primary_attribute == attribute)
  let collection = shuffleArray(heroes)
  return collection
}

function getFilterHero(collection) {
  let item = collection.shift()
  if (item.ability_replace_required) {
    collection = collection.filter((_) => _.ability_replace_required == false)
  }
  return item
}

const NUMBER_PLAYERS = 11

let sdGameClient = new Client({
  // A game definition object.
  game: SingleDraftGame,
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

const SingleDraftCollectionStore = {
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
      const { matches } = await lobbyClient.listMatches(SingleDraftGame.name)
      commit('setMatches', matches)
    },
    async createMatch({ dispatch }, config) {
      let heroes = await dispatch('getHeroes')
      let collection = heroes.map((i) => ({ options: i, selection: null, vote: null }))
      const { matchID } = await lobbyClient.createMatch(SingleDraftGame.name, {
        numPlayers: NUMBER_PLAYERS,
        setupData: { ...config, collection },
        unlisted: false,
      })

      return matchID
    },
    getHeroes() {
      let strHeroes = getShuffledHeroes('STRENGTH')
      let agiHeroes = getShuffledHeroes('AGILITY')
      let intHeroes = getShuffledHeroes('INTELLECT')

      let collection = []
      for (let i = 0; i < 12; i++) {
        let str = getFilterHero(strHeroes)
        let agi = getFilterHero(agiHeroes)
        let int = getFilterHero(intHeroes)
        collection.push([
          { ...str, votes: 0 },
          { ...agi, votes: 0 },
          { ...int, votes: 0 },
        ])
      }
      return collection
    },
    exists({ state }) {
      return state.playerID && state.playerCredentials
    },
  },
  getters: {},
}

const SingleDraftLobbyStore = {
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
      const match = await lobbyClient.getMatch(SingleDraftGame.name, matchID)
      let json = localStorage.getItem(`sd:${matchID}`)
      let existing = JSON.parse(json)
      commit('setMatch', { match, existing })
    },
    async joinSlot({ commit, state }, { playerID, playerName, data }) {
      const { playerCredentials } = await lobbyClient.joinMatch(SingleDraftGame.name, state.match.matchID, { playerID, playerName, data })
      let json = JSON.stringify({ playerID, playerCredentials })
      localStorage.setItem(`sd:${state.match.matchID}`, json)
      commit('joinMatch', { playerID, playerCredentials })
    },
    async leaveSlot({ commit, state }) {
      await lobbyClient.leaveMatch(SingleDraftGame.name, state.match.matchID, {
        playerID: state.playerID,
        credentials: state.playerCredentials,
      })
      localStorage.removeItem(`sd:${state.match.matchID}`)
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

const SingleDraftGameStore = {
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
      const match = await lobbyClient.getMatch(SingleDraftGame.name, matchID)
      let json = localStorage.getItem(`sd:${matchID}`)
      let slot = JSON.parse(json)
      commit('setMatch', { match, slot })
    },
    startClient({ commit, state }) {
      if (state.isConnected) sdGameClient.stop()
      sdGameClient.updateMatchID(state.match.matchID)
      sdGameClient.updatePlayerID(state.slot?.playerID)
      sdGameClient.updateCredentials(state.slot?.playerCredentials)
      sdGameClient.subscribe((gs) => {
        if (gs) {
          commit('updateGameState', gs)
          commit('setSlots', sdGameClient.matchData)
        }
      })
      sdGameClient.start()
    },
    ready() {
      sdGameClient.moves.Readyup()
    },
    pick(_, key) {
      sdGameClient.moves.PickHero(key)
    },
    pickExtra(_, { index, id }) {
      let hero = db.slice(0).find((i) => i.id == id)
      sdGameClient.moves.PickExtra(index, hero)
    },
    voteExtra(_, index) {
      sdGameClient.moves.VoteExtra(index)
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
    slots(state) {
      let slots = state.G.collection.map((x, i) => {
        let item = state.match.players[i + 1]
        return { ...item, ...x }
      })
      return slots
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
    phaseExtra(state) {
      return !state.ctx.gameover && state.ctx.phase == 'extra'
    },
    phaseOver(state) {
      return state.ctx.gameover
    },
    options(state) {
      let item = state.G.collection[state.slot?.playerID - 1]
      return item.options
    },
    selection(state) {
      let item = state.G.collection[state.slot?.playerID - 1]
      return item?.selection
    },
    visibilityFlag(state) {
      return state.G.visibility
    },
    extrasFlag(state) {
      return state.G.extra
    },
    commands: (state) => {
      let cmd = 'dota_gamemode_ability_draft_set_draft_hero_and_team_clear;'
      cmd += 'dota_gamemode_ability_draft_shuffle_draft_order 0;'
      cmd += 'dota_gamemode_ability_draft_shuffle_draft_order;'

      for (let i = 0; i < state.G.collection.length; i++) {
        const key = state.G.collection[i].selection?.key
        if (key) {
          const team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
          cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team ' + key + ' ' + team + ';'
        }
      }

      cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team;'
      return cmd
    },
    launch: (state) => {
      let cmd = '-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear '
      cmd += '+dota_gamemode_ability_draft_shuffle_draft_order 0 '

      for (let i = 0; i < state.G.selection.length; i++) {
        const key = state.G.collection[i].selection?.key
        if (key) {
          const team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
          cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team ' + key + ' ' + team + ' '
        }
      }

      cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team'
      return cmd
    },
  },
}

export const SingleDraft = {
  namespaced: true,
  modules: {
    lobbies: SingleDraftCollectionStore,
    lobby: SingleDraftLobbyStore,
    game: SingleDraftGameStore,
  },
}
