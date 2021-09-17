import { ActivePlayers, TurnOrder, INVALID_MOVE } from 'boardgame.io/core'

function Readyup(G, ctx, timestamp) {
  if (!timestamp) {
    return INVALID_MOVE
  }

  G.timestamp = timestamp
  ctx.events.endPhase()
}

function QuickPick(G, ctx) {
  for (let i = 1; i < 11; i++) {
    let options = G.collection.filter((i) => G.selection.includes(i) == false)
    options = ctx.random.Shuffle(options)
    if (!G.selection[i]) {
      G.selection[i] = options[0]
    }
  }
}

function PickHero(G, ctx, id) {
  if (G.selection[ctx.playerID] !== null) {
    return INVALID_MOVE
  }

  G.selection[ctx.playerID] = id
}

function RandomHero(G, ctx) {
  let options = G.collection.filter((i) => G.selection.includes(i) == false)
  options = ctx.random.Shuffle(options)
  G.selection[ctx.playerID] = options[0]
}

export const AllPickGame = {
  name: 'all-pick',

  disableUndo: true,

  setup: (ctx, data) => {
    return {
      timestamp: null,
      collection: data.collection,
      selection: new Array(ctx.numPlayers + 2).fill(null),
    }
  },

  validateSetupData: (data, players) => {
    if (players != 11) return 'Invaild Number of Players'
    if (!data) return 'Invaild Lobby Configuration'
    if (!data.name) return 'A Lobby Name is required'
    if (data.collection.length < 10) return 'The collection of heroes is less the number of players'
  },

  endIf: (G) => {
    return G.selection.slice(1, 11).every((i) => i)
  },

  phases: {
    ready: {
      start: true,
      moves: { Readyup },
      next: 'pick',
    },
    pick: {
      moves: { PickHero, RandomHero, QuickPick },
      turn: {
        order: TurnOrder.CONTINUE,
        activePlayers: ActivePlayers.ALL_ONCE,
      },
    },
  },
}
