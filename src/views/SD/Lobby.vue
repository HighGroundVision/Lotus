<template>
  <div>
    <Menu />
    <Header>
      <template #title>Single Draft Lobby</template>
      <template #description>Players pick from a pool of one Strength hero, one Agility hero, and one Intelligence hero where the 3 choices are randomly picked and exclusive to that player. </template>
    </Header>
    <div style="background: #191919; margin-top: -5px">
      <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 0px; padding-bottom: 100px">
        <div v-if="existing">
          <LobbyReconnect />
        </div>
        <div v-else>
          <LobbySlots @refresh="loadData" />
          <LobbyHost @refresh="loadData" />
        </div>
      </div>
    </div>
    <Footer />
    <Persona />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import LobbyReconnect from '@/components/SD/LobbyReconnect.vue'
import LobbySlots from '@/components/SD/LobbySlots.vue'
import LobbyHost from '@/components/SD/LobbyHost.vue'
import Persona from '@/components/Persona.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('sd/lobby')

export default {
  components: {
    Menu,
    Header,
    Footer,
    LobbyReconnect,
    LobbySlots,
    LobbyHost,
    Persona,
  },
  setup() {},
  computed: {
    ...mapGetters(['existing']),
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    ...mapActions(['loadMatch']),
    async loadData() {
      try {
        let matchId = this.$route.params.matchID
        await this.loadMatch(matchId)
      } catch (error) {
        this.$toast.open({ message: error.details, type: 'error' })
        this.$router.push({ name: 'single-draft' })
      }
    },
  },
}
</script>

<style scoped></style>
