<template>
  <div>
    <img alt="hero image" style="position: absolute; left: -50px; top: 0px; height: 390px" src="https://hyperstone.highgroundvision.com/images/heroes/profile/97.png" />
    <Menu />
    <Header>
      <template #title>All Pick</template>
      <template #description>
        Players can pick form the full hero pool. Players have a number seconds determind by the host for bans and picks. Players can also chose to random a hero. The Extra heroes may be Random the default, Host Choice where the host selects the extra heroes from those unselected.</template
      >
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
