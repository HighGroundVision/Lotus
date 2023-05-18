import db from '@/assets/heroes.json'
import { shuffleArray, balanceByWinrate, matchedSort } from '@/store/shuffle'

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const NILL_HERO = {
  id: 0,
  key: null,
  image_banner: 'https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg',
}

// const NILL_HERO_ID = 0

export const BalancedDraft = {
  namespaced: true,
  state: () => {
    let data = {
      heroes: db.slice(),
      // Overrides
      randomizeRadiant: false,
      randomizeDire: false,
      randomizeExtras: false,
      // Filters
      complexity: null,
      attribute: null,
      roles: null,
      winrateRange: [30, 70],
      // Balance
      balanceAttribute: false,
      balanceCapabilities: false,
      balanceUrist: false,
      // Order
      sequence: 0,
      // Additional Options
      playerShuffle: true,
      draftTime: 60,
      roundTime: 5,
      pickTime: 7,
      // Roster
      selection: Array(12)
        .fill()
        .map(() => NILL_HERO),
    }
    return data
  },
  mutations: {
    set(state, { key, value }) {
      state[key] = value
    },
    update(state, collection) {
      state.selection = collection
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
    default({ commit }, option) {
      switch (option.toLowerCase()) {
        case 'win-rate':
          commit('set', { key: 'balanceUrist', value: true })
          break
        case 'speed-draft':
          commit('set', { key: 'draftTime', value: 20 })
          commit('set', { key: 'roundTime', value: 3 })
          commit('set', { key: 'pickTime', value: 1 })
          break
        case 'all-intelligence':
          commit('set', { key: 'attribute', value: ['INTELLECT'] })
          commit('set', { key: 'balanceCapabilities', value: true })
          break
        case 'hard-mode':
          commit('set', { key: 'winrateRange', value: [30, 50] })
          commit('set', { key: 'sequence', value: 1 })
          break
        default:
          break
      }
    },
    generate({ commit, state }) {
      /*, getters */
      commit('clear')

      let collection = state.heroes.slice(0)

      if (state.complexity) {
        collection = collection.filter((_) => _.complexity == state.complexity)
      }

      if (state.attribute && state.attribute.length > 0) {
        let filters = []
        for (const i of state.attribute) {
          filters.push((_) => _.primary_attribute == i)
        }
        collection = collection.filter((_) => filters.some((f) => f(_)))
      }

      if (state.roles && state.roles.length > 0) {
        let filters = []
        for (const i of state.roles) {
          filters.push((_) => _.roles.some((x) => x == i))
        }
        collection = collection.filter((_) => filters.some((f) => f(_)))
      }

      let wrLower = state.winrateRange[0] / 100
      let wrUpper = state.winrateRange[1] / 100
      collection = collection.filter((_) => _.win_rate >= wrLower && _.win_rate <= wrUpper)

      let roster = [
        { hero: null, team: 1, randomize: state.randomizeRadiant },
        { hero: null, team: 2, randomize: state.randomizeDire },
        { hero: null, team: 1, randomize: state.randomizeRadiant },
        { hero: null, team: 2, randomize: state.randomizeDire },
        { hero: null, team: 1, randomize: state.randomizeRadiant },
        { hero: null, team: 2, randomize: state.randomizeDire },
        { hero: null, team: 1, randomize: state.randomizeRadiant },
        { hero: null, team: 2, randomize: state.randomizeDire },
        { hero: null, team: 1, randomize: state.randomizeRadiant },
        { hero: null, team: 2, randomize: state.randomizeDire },
        { hero: null, team: 3, randomize: state.randomizeExtras },
        { hero: null, team: 3, randomize: state.randomizeExtras },
      ]

      for (let i = 0; i < 100; i++) {
        let filtered = collection.slice(0)
        shuffleArray(filtered)

        for (const item of roster) {
          if (item.randomize) continue

          let hero = filtered.shift()
          if (hero == undefined) break

          if (hero.ability_replace_required) {
            filtered = filtered.filter((x) => x.ability_replace_required == false)
          }

          item.hero = hero
        }

        let radiant = roster
          .filter((x) => x.hero)
          .filter((_) => _.team == 1)
          .map((x) => x.hero)
        let dire = roster
          .filter((x) => x.hero)
          .filter((_) => _.team == 2)
          .map((x) => x.hero)

        let rag = groupBy(radiant, 'primary_attribute')
        let dag = groupBy(dire, 'primary_attribute')
        let attributes = Object.keys(rag).length == Object.keys(dag).length
        let rcg = groupBy(radiant, 'attack_capabilities')
        let dcg = groupBy(dire, 'attack_capabilities')
        let capabilities = Object.keys(rcg).length == Object.keys(dcg).length

        if (state.balanceAttribute && state.balanceCapabilities && attributes && capabilities) {
          break
        } else if (state.balanceAttribute && attributes) {
          break
        } else if (state.balanceCapabilities && capabilities) {
          break
        } else {
          break
        }
      }
      if (state.balanceUrist) {
        roster = balanceByWinrate(roster)
      }

      let heroes = (state.sequence == 3 ? matchedSort(roster) : roster)
        .sort((lhs, rhs) => {
          let result = lhs.team - rhs.team
          if (result == 0) {
            return state.sequence == 1 ? lhs.hero?.win_rate - rhs.hero?.win_rate : state.sequence == 2 ? rhs.hero?.win_rate - lhs.hero?.win_rate : 0
          } else {
            return result
          }
        })
        .map((x) => {
          return x.hero ?? NILL_HERO
        })

      commit('update', heroes)
    },
    clear({ commit }) {
      commit('clear')
    },
  },
  getters: {
    attributeOptions: () => {
      return [
        { value: 'STRENGTH', label: 'Strength' },
        { value: 'AGILITY', label: 'Agility' },
        { value: 'INTELLECT', label: 'Intelligence' },
      ]
      //['Strength', 'Agility', 'Intelligence']
    },
    rolesOptions: () => {
      return ['Support', 'Carry', 'Disabler', 'Initiator', 'Nuker', 'Escape', 'Disabler', 'Jungler', 'Pusher']
    },
    sequenceOptions: () => {
      return [
        { value: 0, label: 'Random' },
        { value: 1, label: 'Weaker Heroes First' },
        { value: 2, label: 'Stronger Heroes First' },
        { value: 3, label: 'Matched' },
      ]
    },
    commands: (state) => {
      let cmd = 'dota_gamemode_ability_draft_set_draft_hero_and_team_clear;'

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
        if (hero) {
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
        if (hero) {
          var team = i < 5 ? 'radiant' : i < 10 ? 'dire' : 'extra'
          cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team ' + hero.key + ' ' + team + ' '
        }
      }

      cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team'
      return cmd
    },
  },
}
