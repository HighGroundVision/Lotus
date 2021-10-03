<template>
  <div>
    <img alt="hero image" style="position: absolute; left: -50px; top: 0px; height: 390px; transform: scaleX(-1)" src="https://hyperstone.highgroundvision.com/images/heroes/profile/53.png" />
    <Menu />
    <Header>
      <template v-slot:title>Captains Duel</template>
      <template v-slot:description>
        The host can control the number and sequence for the bans and picks. The host can set the time in seconds to complete all actions in the sequence. If time runs out during a phase the selection will be random. If time runs out during a phase the selection will be random.
      </template>
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
import LobbyReconnect from '@/components/CD/LobbyReconnect.vue'
import LobbySlots from '@/components/CD/LobbySlots.vue'
import LobbyHost from '@/components/CD/LobbyHost.vue'
import Persona from '@/components/Persona.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('cd/lobby')

export default {
  setup() {},
  async mounted() {
    await this.loadData()
  },
  components: {
    Menu,
    Header,
    Footer,
    LobbyReconnect,
    LobbySlots,
    LobbyHost,
    Persona,
  },
  computed: {
    ...mapGetters(['existing']),
  },
  methods: {
    ...mapActions(['loadMatch']),
    async loadData() {
      try {
        let matchId = this.$route.params.matchID
        await this.loadMatch(matchId)
      } catch (error) {
        this.$toast.open({ message: error.details, type: 'error' })
        this.$router.push({ name: 'captains-duel' })
      }
    },
  },
}
</script>

<style scoped></style>
