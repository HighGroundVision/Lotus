import { ActivePlayers, TurnOrder } from 'boardgame.io/core'

function Readyup(_, ctx) {
  ctx.events.endPhase()
}

function PickHero(G, ctx, index) {
  G.collection[ctx.playerID - 1].selection = G.collection[ctx.playerID - 1].options[index]
}

function QuickPick(G, ctx) {
  for (let i = 0; i < 10; i++) {
    let o = ctx.random.Die(3) - 1
    G.collection[i].selection = G.collection[i].options[o]
  }
}

function PickExtra(G, _, index, hero) {
  G.collection[index].selection = hero
}

function VoteExtra(G, ctx, index) {
  let pi = ctx.playerID - 1
  G.collection[pi].vote = index
  let which = pi < 5 ? 10 : 11
  G.collection[which].options[index].votes++
  ctx.events.endStage()
}

export const SingleDraftGame = {
  name: 'single-draft',

  disableUndo: true,

  setup: (_, data) => {
    return {
      // ready: false,
      visibility: data.visibility,
      extra: data.extra,
      collection: data.collection,
    }
  },

  validateSetupData: (data, players) => {
    if (players != 11) return 'Invaild Number of Players'
    if (!data) return 'Invaild Lobby Configuration'
    if (!data.name) return 'A Lobby Name is required'
    if (data.collection.length != 12) return 'Invaild Roster Length'
    if (data.visibility < 1) return 'Invaild Visibility Option'
    if (data.extra < 1) return 'Invaild Extra Option'
  },

  phases: {
    ready: {
      start: true,
      moves: { Readyup },
      next: 'pick',
    },
    pick: {
      moves: { PickHero, QuickPick },
      endIf: (G) => {
        return G.collection.slice(0, 10).every((i) => i.selection)
      },
      turn: {
        order: TurnOrder.CONTINUE,
        // activePlayers: ActivePlayers.OTHERS_ONCE,
        activePlayers: ActivePlayers.ALL_ONCE,
      },
      next: 'extra',
    },
    extra: {
      // moves: { PickExtra, VoteExtra },
      onBegin: (G, ctx) => {
        if (G.extra == 1) {
          ctx.events.endGame()
        }
      },
      onEnd: (_, ctx) => ctx.events.endGame(),
      endIf: (G) => G.collection.every((i) => i.selection),
      turn: {
        order: TurnOrder.CONTINUE,
        activePlayers: {
          currentPlayer: 'pick',
          others: 'vote',
        },
        stages: {
          pick: {
            moves: { PickExtra },
          },
          vote: {
            moves: { VoteExtra },
          },
        },
      },
    },
  },
}
