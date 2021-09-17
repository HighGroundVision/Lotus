<template>
  <div>
    <Menu />
    <Header>
      <template v-slot:title>All Pick</template>
      <template v-slot:description> Players can pick form the full hero pool.Players have a number seconds determind by the host for selection or their pick will be randomed.Players can also chose to random a hero. </template>
    </Header>
    <div v-if="isConnected">
      <div v-if="isHost">
        <GameHost />
      </div>
      <div v-else-if="isPlayer">
        <GamePlayer />
      </div>
      <div v-else-if="isSpectator">
        <GameSpectator />
      </div>
    </div>
    <div v-else>
      <GameDisconnected />
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import GameDisconnected from '@/components/AP/GameDisconnected.vue'
import GameSpectator from '@/components/AP/GameSpectator.vue'
import GameHost from '@/components/AP/GameHost.vue'
import GamePlayer from '@/components/AP/GamePlayer.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('ap/game')

export default {
  setup() {},
  async mounted() {
    let matchID = this.$route.params.matchID
    await this.loadMatch(matchID)
    await this.startClient()
  },
  components: {
    Menu,
    Header,
    Footer,
    GameDisconnected,
    GameSpectator,
    GamePlayer,
    GameHost,
  },
  computed: {
    ...mapState(['isConnected']),
    ...mapGetters(['isHost', 'isPlayer', 'isSpectator']),
  },
  methods: {
    ...mapActions(['loadMatch', 'startClient']),
  },
}
</script>

<style scoped></style>
