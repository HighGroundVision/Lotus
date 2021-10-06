<template>
  <div>
    <img alt="hero image" style="position: absolute; left: -50px; top: 0px; height: 390px; transform: scaleX(-1)" src="https://hyperstone.highgroundvision.com/images/heroes/profile/53.png" />
    <Menu />
    <Header>
      <template #title>Captains Duel</template>
      <template #description>
        The host can control the number and sequence for the bans and picks. The host can set the time in seconds to complete all actions in the sequence. If time runs out during a phase the selection will be random. If time runs out during a phase the selection will be random.
      </template>
    </Header>
    <div style="background: #191919; margin-top: -5px">
      <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 0px; padding-bottom: 100px">
        <LobbyList />
        <hr />
        <LobbyCreate />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import LobbyList from '@/components/CD/LobbyList.vue'
import LobbyCreate from '@/components/CD/LobbyCreate.vue'

export default {
  components: {
    Menu,
    Header,
    Footer,
    LobbyList,
    LobbyCreate,
  },
  setup() {},
}
</script>

<style scoped></style>
