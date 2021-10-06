import { TurnOrder, ActivePlayers } from 'boardgame.io/core'

function NextPhase(G, ctx) {
  G.ts = Date.now()
  let next = G.sequence[0]
  ctx.events.endTurn({ next: next.team })
  ctx.events.endPhase()
}

function PlayersChoice(G, ctx, id, replacement) {
  G.replacement |= replacement

  let turn = ctx.turn - 3

  let current = G.sequence[turn]
  current.choice = id

  let vnext = G.sequence[turn + 1]
  if (vnext) {
    ctx.events.endTurn({ next: vnext.team })
  }
}

function UpdateOrder(G, ctx, data) {
  let roster = Object.values(data)
  for (const item of G.sequence) {
    if (item.stage == 'pick' && item.team == ctx.playerID) {
      item.choice = roster.shift()
    }
  }
}

function PlayerDone(G, ctx) {
  G.done[ctx.playerID - 1] = true
}

export const CaptainsDuelGame = {
  name: 'captains-duel',

  disableUndo: true,

  setup: (_, data) => {
    return {
      ts: null,
      done: [false, false],
      replacement: false,
      sequence: data.sequence,
    }
  },

  validateSetupData: (data, players) => {
    if (players != 3) return 'Invaild Number of Players'
    if (!data) return 'Invaild Lobby Configuration'
    if (!data.name) return 'A Lobby Name is Required'
    if (data.sequence.length < 1) return 'A Sequence is Required'
    if (data.sequence.filter((i) => i.stage == 'pick' && i.team == 1).length != 5) return 'Radiant Must Have 5 Pick Stages'
    if (data.sequence.filter((i) => i.stage == 'pick' && i.team == 2).length != 5) return 'Dire Must Have 5 Pick Stages'
    if (data.sequence.some((i) => i.stage == 'extra') && data.sequence.filter((i) => i.stage == 'extra').length != 2) return 'Invalid Number of Extra Stages'
    if (data.sequence.filter((i) => i.stage == 'ban').length > 20) return 'Invalid Number of Ban Stages'
  },

  phases: {
    ready: {
      start: true,
      moves: { NextPhase },
      next: 'draft',
    },
    draft: {
      moves: { PlayersChoice },
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
      endIf: (G) => G.sequence.every((i) => i.choice),
      next: 'order',
    },
    order: {
      moves: { UpdateOrder, PlayerDone },
      turn: {
        order: TurnOrder.CONTINUE,
        activePlayers: ActivePlayers.ALL,
      },
      endIf: (G) => G.done.every((i) => i),
      onEnd: (_, ctx) => ctx.events.endGame(),
    },
  },
}
