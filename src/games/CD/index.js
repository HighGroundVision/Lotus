import { TurnOrder } from 'boardgame.io/core'

function NextPhase(G, ctx) {
  G.ts = Date.now()
  let next = G.sequence[0]
  ctx.events.endTurn({ next: next.team })
  ctx.events.endPhase()
}

function MakeChoice(G, ctx, id) {
  let turn = ctx.turn - 3

  let current = G.sequence[turn]
  current.choice = id

  let next = G.sequence[turn + 1]
  if (next) {
    ctx.events.endTurn({ next: next.team })
  } else {
    ctx.events.endGame()
  }
}

export const CaptainsDuelGame = {
  name: 'captains-duel',

  disableUndo: true,

  setup: (_, data) => {
    return {
      ts: null,
      sequence: data.sequence,
    }
  },

  validateSetupData: (data, players) => {
    if (players != 3) return 'Invaild Number of Players'
    if (!data) return 'Invaild Lobby Configuration'
    if (!data.name) return 'A Lobby Name is required'
    if (data.sequence.length < 1) return 'A Sequence required'
  },

  phases: {
    ready: {
      start: true,
      moves: { NextPhase },
      next: 'draft',
    },
    draft: {
      moves: { MakeChoice },
      turn: {
        order: TurnOrder.CONTINUE,
        onBegin: (G, ctx) => {
          let turn = ctx.turn - 3
          let current = G.sequence[turn]
          current.start = Date.now()
        },
        onEnd: (G, ctx) => {
          let turn = ctx.turn - 3
          let current = G.sequence[turn]
          current.end = Date.now()
          current.delta = current.end - current.start
          G.ts = current.end
        },
      },
    },
  },
}
