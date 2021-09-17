<template>
  <div>
    <h1>Matches</h1>
    <div style="display: flex">
      <div v-if="matches.length == 0">
        <p>There are no matches currently, if you are expecting this page will automaticly reference in a few seconds with any new matches.</p>
      </div>
      <template v-for="game in matches" :key="game.matchID">
        <div style="border: 2px solid rgb(100, 109, 208); border-radius: 10px; margin: 20px; width: 200px">
          <div style="background-color: rgb(100, 109, 208); padding: 5px">
            <div style="float: right">
              <span>{{ connected(game) }} / 10</span>
            </div>
            <div>
              {{ name(game) }}
            </div>
          </div>
          <div style="margin: 5px">
            <div @click="join(game.matchID)" class="jnbrig">
              <span>Lobby</span>
            </div>
            <div @click="spectate(game.matchID)" class="jnbrig">
              <span>Spectate</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('ap/lobbies')

export default {
  data() {
    return {
      timer: null,
    }
  },
  mounted() {
    this.findMatches()
    this.timer = setInterval(this.findMatches, 10000)
  },
  beforeUnmount() {
    this.cancelAutoUpdate()
  },
  computed: {
    ...mapState(['matches']),
  },
  methods: {
    ...mapActions(['findMatches']),
    name(game) {
      return game.setupData.name
    },
    connected(game) {
      return game.players.filter((_) => _.name).length
    },
    limit(game) {
      return game.players.length
    },
    join(matchID) {
      this.$router.push({ name: 'all-pick-lobby', params: { matchID: matchID } })
    },
    spectate(matchID) {
      this.$router.push({ name: 'all-pick-game', params: { matchID: matchID } })
    },
    cancelAutoUpdate() {
      if (this.timer) clearInterval(this.timer)
    },
  },
}
</script>

<style scoped>
.jnbrig {
  padding: 12px 20px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid rgb(34, 34, 34);
  height: 50px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  margin-right: 2px;
}

.jnbrig:hover {
  background: #6161ab;
  border: 2px solid #00000040 !important;
}
</style>
