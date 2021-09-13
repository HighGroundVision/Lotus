import db from '@/assets/heroes.json'

export const HostChoice = {
  namespaced: true,
  state: () => {
    let data = {
      heroes: db.slice(),
      selection: [],
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
    add(state, hero) {
      state.selection.push(hero)
    },
    remove(state, hero) {
      state.selection = state.selection.filter((i) => i.id != hero.id)
    },
  },
  actions: {
    update({ commit }, collection) {
      commit('update', collection)
    },
    select({ commit, state }, hero) {
      if (state.selection.some((i) => i.id == hero.id)) {
        commit('remove', hero)
        return
      }
      if (state.selection.length < 12) {
        commit('add', hero)
        return
      }
    },
    clear({ commit, state }) {
      for (const hero of state.selection) {
        commit('remove', hero)
      }
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
        var team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
        cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team ' + hero.key + ' ' + team + ';'
      }

      cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team;'
      return cmd
    },
    launch: (state) => {
      let cmd = '-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear '

      if (state.playerShuffle == false) {
        cmd += '+dota_gamemode_ability_draft_shuffle_draft_order 0 '
      }

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
        var team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
        cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team ' + hero.key + ' ' + team + ' '
      }

      cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team'
      return cmd
    },
  },
}
