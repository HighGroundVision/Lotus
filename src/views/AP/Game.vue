<template>
  <div>
    <Menu />
    <Header>
      <template #title>All Pick</template>
      <template #description>
        Players can pick form the full hero pool. Players have a number seconds determind by the host for bans and picks. Players can also chose to random a hero. The Extra heroes may be Random the default, Host Choice where the host selects the extra heroes from those unselected.</template
      >
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
  components: {
    Menu,
    Header,
    Footer,
    GameDisconnected,
    GameSpectator,
    GamePlayer,
    GameHost,
  },
  setup() {},
  computed: {
    ...mapState(['isConnected']),
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
