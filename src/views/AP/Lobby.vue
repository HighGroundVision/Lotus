<template>
  <div>
    <img alt="hero image" style="position: absolute; left: -50px; top: 0px; height: 390px" src="https://hyperstone.highgroundvision.com/images/heroes/profile/97.png" />
    <Menu />
    <Header>
      <template v-slot:title>All Pick</template>
      <template v-slot:description> Players can pick form the full hero pool. Players have a number seconds determind by the host for selection or their pick will be randomed. Players can also chose to random a hero. </template>
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
import LobbyReconnect from '@/components/AP/LobbyReconnect.vue'
import LobbySlots from '@/components/AP/LobbySlots.vue'
import LobbyHost from '@/components/AP/LobbyHost.vue'
import Persona from '@/components/Persona.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('ap/lobby')

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
        this.$router.push({ name: 'all-pick' })
      }
    },
  },
}
</script>

<style scoped></style>
