<template>
  <div>
    <h1>Matches</h1>
    <div style="display: flex">
      <template v-for="game in matches" :key="game.matchID">
        <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; margin: 20px; padding: 30px">
          <span>{{ game.matchID }}</span>
          <br />
          <span>{{ new Date(game.updatedAt).toLocaleTimeString('en-US') }}</span>
          <div>
            <ul>
              <template v-for="player in game.players" :key="player.matchID">
                <li @click="join(game.matchID, player.id.toString())">{{ player.id }} - {{ player.name }}</li>
              </template>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('sd')

export default {
  setup() {},
  mounted() {
    this.$store.dispatch('sd/findMatches')
  },
  computed: {
    ...mapState(['matches']),
  },
  methods: {
    ...mapActions(['joinMatch', 'findMatches']),
    async join(matchID, playerID) {
      await this.joinMatch({ matchID, playerID, playerName: 'Test' })
      await this.findMatches()
    },
  },
}
</script>

<style scoped></style>
