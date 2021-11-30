import { Client } from 'boardgame.io/client'
import { SocketIO } from 'boardgame.io/multiplayer'
import { lobbyClient } from '@/store/lobby'
import { CaptainsDuelGame } from '@/games/CD/'
import db from '@/assets/heroes.json'

const NUMBER_PLAYERS = 3

let cdGameClient = new Client({
  // A game definition object.
  game: CaptainsDuelGame,
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
      let collection = sequence.map((x, i) => ({ id: i + 1, stage: x.stage, team: x.team, choice: null, start: null, end: null, delta: 0.0 }))

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
      let json = localStorage.getItem(`cd:${matchID}`)
      let existing = JSON.parse(json)
      commit('setMatch', { match, existing })
    },
    async joinSlot({ commit, state }, { playerID, playerName, data }) {
      const { playerCredentials } = await lobbyClient.joinMatch(CaptainsDuelGame.name, state.match.matchID, { playerID, playerName, data })
      let json = JSON.stringify({ playerID, playerCredentials })
      localStorage.setItem(`cd:${state.match.matchID}`, json)
      commit('joinMatch', { playerID, playerCredentials })
    },
    async leaveSlot({ commit, state }) {
      await lobbyClient.leaveMatch(CaptainsDuelGame.name, state.match.matchID, {
        playerID: state.playerID,
        credentials: state.playerCredentials,
      })
      localStorage.removeItem(`cd:${state.match.matchID}`)
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
      let json = localStorage.getItem(`cd:${matchID}`)
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
    playersReady() {
      cdGameClient.moves.NextPhase()
    },
    makeChoice({ getters }, hero) {
      let replacement = getters.stagePick ? hero.ability_replace_required : false
      cdGameClient.moves.PlayersChoice(hero.id, replacement)
    },
    updateOrder(_, roster) {
      let data = Object.assign({}, roster)
      cdGameClient.moves.UpdateOrder(data)
    },
    doneOrdering() {
      cdGameClient.moves.PlayerDone()
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
    phaseOrder(state) {
      return !state.ctx.gameover && state.ctx.phase == 'order'
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
      let turn = state.ctx.turn - 3
      let current = state.G.sequence[turn]
      return current.stage == 'ban'
    },
    stagePick(state) {
      let turn = state.ctx.turn - 3
      let current = state.G.sequence[turn]
      return current.stage == 'pick'
    },
    stageExtra(state) {
      let turn = state.ctx.turn - 3
      let current = state.G.sequence[turn]
      return current.stage == 'extra'
    },
    isDone(state) {
      let id = (state.slot?.playerID ?? 1) - 1
      return state.G.done[id]
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
      let sequence = state.G.sequence.map((i) => ({
        ...i,
        hero: db.find((h) => h.id == i.choice),
      }))
      return sequence
    },
    replacement(state) {
      return state.G.replacement
    },
    commands: (state) => {
      let cmd = 'dota_gamemode_ability_draft_set_draft_hero_and_team_clear;'

      let sequence = state.G.sequence.map((i) => ({
        ...i,
        hero: db.find((h) => h.id == i.choice),
      }))

      for (const item of sequence) {
        if (item.stage == 'pick') {
          const team = item.team == 1 ? 'radiant' : 'dire'
          cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team ' + item.hero.key + ' ' + team + ';'
        } else if (item.stage == 'extra') {
          cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team ' + item.hero.key + ' extra;'
        }
      }

      cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team;'
      return cmd
    },
    launch: (state) => {
      let cmd = '-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear '

      let sequence = state.G.sequence.map((i) => ({
        ...i,
        hero: db.find((h) => h.id == i.choice),
      }))

      for (const item of sequence) {
        if (item.stage == 'pick') {
          const team = item.team == 1 ? 'radiant' : 'dire'
          cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team ' + item.hero.key + ' ' + team + ' '
        } else if (item.stage == 'extra') {
          cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team ' + item.hero.key + ' extra '
        }
      }

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
