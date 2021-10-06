<template>
  <div>
    <Menu />
    <Header>
      <template #title>Captains Duel</template>
      <template #description>
        The host can control the number and sequence for the bans and picks. The host can set the time in seconds to complete all actions in the sequence. If time runs out during a phase the selection will be random. If time runs out during a phase the selection will be random.
      </template>
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
import GameDisconnected from '@/components/CD/GameDisconnected.vue'
import GameSpectator from '@/components/CD/GameSpectator.vue'
import GameHost from '@/components/CD/GameHost.vue'
import GamePlayer from '@/components/CD/GamePlayer.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('cd/game')

export default {
  components: {
    Menu,
    Header,
    Footer,
    GameDisconnected,
    GameSpectator,
    GamePlayer,
    GameHost,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['isConnected', 'isActive']),
    ...mapGetters(['isHost', 'isPlayer', 'isSpectator']),
  },
  async mounted() {
    let matchID = this.$route.params.matchID
    await this.loadMatch(matchID)
    await this.startClient()
  },
  methods: {
    ...mapActions(['loadMatch', 'startClient']),
  },
}
</script>

<style scoped></style>
