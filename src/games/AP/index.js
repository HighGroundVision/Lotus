import { ActivePlayers, TurnOrder, INVALID_MOVE } from 'boardgame.io/core'

function NextPhase(_, ctx) {
  ctx.events.endPhase()
}

function BanHero(G, ctx, id) {
  if (G.bans[ctx.playerID] !== null) {
    return INVALID_MOVE
  }

  if (G.bans.includes(id)) {
    return INVALID_MOVE
  }

  G.bans[ctx.playerID] = id
}

function PickHero(G, ctx, id, replacements) {
  if (G.picks[ctx.playerID] !== null) {
    return INVALID_MOVE
  }

  if (G.bans.includes(id) || G.picks.includes(id)) {
    return INVALID_MOVE
  }

  G.picks[ctx.playerID] = id

  for (const id of replacements) {
    G.bans.push(id)
  }
}

function RandomHero(G, ctx) {
  let available = G.collection
    .filter((i) => G.bans.includes(i) == false)
    .filter((i) => G.picks.includes(i) == false)
    .slice(0)
  let options = ctx.random.Shuffle(available)
  G.picks[ctx.playerID] = options[0]
}

function PickExtra(G, _, index, id) {
  G.picks[index] = id
}

function FinalizeRoster(G, ctx) {
  G.pickTimeStamp = null

  let available = G.collection
    .filter((i) => G.bans.includes(i) == false)
    .filter((i) => G.picks.includes(i) == false)
    .slice(0)
  let options = ctx.random.Shuffle(available).slice(0)
  for (let i = 1; i < 11; i++) {
    if (!G.picks[i]) {
      G.picks[i] = options.shift()
    }
  }
}

export const AllPickGame = {
  name: 'all-pick',

  disableUndo: true,

  setup: (ctx, data) => {
    return {
      banTimeStamp: null,
      banTime: data.banSwitch ? data.banTime : 0,
      pickTimeStamp: null,
      pickTime: data.pickTime,
      extra: data.extra,
      collection: data.collection,
      bans: new Array(ctx.numPlayers).fill(null),
      picks: new Array(ctx.numPlayers + 2).fill(null),
    }
  },

  validateSetupData: (data, players) => {
    if (players != 11) return 'Invaild Number of Players'
    if (!data) return 'Invaild Lobby Configuration'
    if (!data.name) return 'A Lobby Name is required'
    if (!data.banTime) return 'Invaild Ban Time'
    if (data.banTime < 5 || data.banTime > 30) return 'Invaild Ban Time'
    if (!data.pickTime) return 'Invaild Pick Time'
    if (data.pickTime < 10 || data.pickTime > 120) return 'Invaild Pick Time'
    if (data.collection.length < 10) return 'The collection of heroes is less the number of players'
    if (data.extra < 1) return 'Invaild Extra Option'
  },

  phases: {
    ready: {
      start: true,
      moves: { NextPhase },
      next: (G) => {
        return G.banTime > 0 ? 'ban' : 'pick'
      },
    },
    ban: {
      moves: { BanHero, NextPhase },
      onBegin: (G) => {
        G.banTimeStamp = Date.now() + G.banTime * 1000
      },
      onEnd: (G) => {
        G.banTimeStamp = null
      },
      endIf: (G) => {
        return G.bans.every((i) => i)
      },
      turn: {
        order: TurnOrder.CONTINUE,
        activePlayers: ActivePlayers.ALL_ONCE,
      },
      next: 'pick',
    },
    pick: {
      moves: { PickHero, RandomHero, NextPhase },
      onBegin: (G) => {
        G.pickTimeStamp = Date.now() + G.pickTime * 1000
      },
      onEnd: FinalizeRoster,
      turn: {
        order: TurnOrder.CONTINUE,
        activePlayers: ActivePlayers.ALL_ONCE,
      },
      next: 'extra',
    },
    extra: {
      moves: { PickExtra },
      onBegin: (G, ctx) => {
        if (G.extra == 1) ctx.events.endGame()
      },
      onEnd: (_, ctx) => ctx.events.endGame(),
      endIf: (G) => G.picks.slice(1).every((i) => i),
      turn: {
        order: TurnOrder.CONTINUE,
      },
    },
  },
}
