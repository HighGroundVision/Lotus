<template>
  <div>
    <Menu />
    <Header>
      <template #title>Single Draft</template>
      <template #description>Players pick from a pool of one Strength hero, one Agility hero, and one Intelligence hero where the 3 choices are randomly picked and exclusive to that player. </template>
    </Header>
    <div style="background: #191919; margin-top: -5px">
      <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 10px 100px 10px">
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
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import GameDisconnected from '@/components/SD/GameDisconnected.vue'
import GameSpectator from '@/components/SD/GameSpectator.vue'
import GameHost from '@/components/SD/GameHost.vue'
import GamePlayer from '@/components/SD/GamePlayer.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('sd/game')

export default {
  components: {
    Menu,
    Header,
    Footer,
    GameDisconnected,
    GameSpectator,
    GameHost,
    GamePlayer,
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
