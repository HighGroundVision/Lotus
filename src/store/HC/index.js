import db from '@/assets/heroes.json'

const NILL_HERO = {
  id: 0,
  key: null,
  image_banner: 'https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg',
}

const NILL_HERO_ID = 0
const NO_RESULT = -1

export const HostChoice = {
  namespaced: true,
  state: () => {
    let data = {
      heroes: db.slice(),
      selection: Array(12)
        .fill()
        .map(() => NILL_HERO),
      playerShuffle: true,
      draftTime: 60,
      roundTime: 5,
      pickTime: 7,
    }
    return data
  },
  mutations: {
    setPlayerShuffle(state, value) {
      state.playerShuffle = value
    },
    setDraftTime(state, value) {
      state.draftTime = value
    },
    setRoundTime(state, value) {
      state.roundTime = value
    },
    setPickTime(state, value) {
      state.pickTime = value
    },
    update(state, collection) {
      state.selection = collection
    },
    add(state, { index, hero }) {
      state.selection[index] = hero
    },
    remove(state, index) {
      state.selection[index] = NILL_HERO
    },
    clear(state) {
      state.selection = Array(12)
        .fill()
        .map(() => NILL_HERO)
    },
  },
  actions: {
    update({ commit }, collection) {
      commit('update', collection)
    },
    select({ commit, state }, hero) {
      let existing = state.selection.findIndex((i) => i.id == hero.id)
      if (NO_RESULT != existing) {
        commit('remove', existing)
        return
      }

      let index = state.selection.findIndex((i) => i.id == NILL_HERO_ID)
      if (NO_RESULT != index) {
        commit('add', { index, hero })
        return
      }
    },
    clear({ commit }) {
      commit('clear')
    },
  },
  getters: {
    // async
    commands: (state) => {
      let cmd = 'dota_gamemode_ability_draft_set_draft_hero_and_team_clear;'

      if (state.playerShuffle == false) {
        cmd += 'dota_gamemode_ability_draft_shuffle_draft_order 0;'
        cmd += 'dota_gamemode_ability_draft_shuffle_draft_order;'
      }

      if (state.pickTime != 7) {
        cmd += 'dota_gamemode_ability_draft_per_player_time ' + state.pickTime + ';'
        cmd += 'dota_gamemode_ability_draft_per_player_time;'
      }
      if (state.roundTime != 5) {
        cmd += 'dota_gamemode_ability_draft_pre_round_time ' + state.roundTime + ';'
        cmd += 'dota_gamemode_ability_draft_pre_round_time;'
      }
      if (state.draftTime != 60) {
        cmd += 'dota_gamemode_ability_draft_pre_time ' + state.draftTime + ';'
        cmd += 'dota_gamemode_ability_draft_pre_time;'
      }

      for (let i = 0; i < state.selection.length; i++) {
        const hero = state.selection[i]
        if (hero.key) {
          var team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
          cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team ' + hero.key + ' ' + team + ';'
        }
      }

      cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team;'
      return cmd
    },
    launch: (state) => {
      let cmd = '-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear '

      if (state.pickTime != 7) {
        cmd += '+dota_gamemode_ability_draft_per_player_time ' + state.pickTime + ' '
      }
      if (state.roundTime != 5) {
        cmd += '+dota_gamemode_ability_draft_pre_round_time ' + state.roundTime + ' '
      }
      if (state.draftTime != 60) {
        cmd += '+dota_gamemode_ability_draft_pre_time ' + state.draftTime + ' '
      }

      for (let i = 0; i < state.selection.length; i++) {
        const hero = state.selection[i]
        if (hero.key) {
          var team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
          cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team ' + hero.key + ' ' + team + ' '
        }
      }

      cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team'
      return cmd
    },
  },
}
