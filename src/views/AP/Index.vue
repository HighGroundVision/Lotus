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
import LobbyList from '@/components/AP/LobbyList.vue'
import LobbyCreate from '@/components/AP/LobbyCreate.vue'

export default {
  setup() {},
  components: {
    Menu,
    Header,
    Footer,
    LobbyList,
    LobbyCreate,
  },
}
</script>

<style scoped></style>
