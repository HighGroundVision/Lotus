<template>
  <div>
    <img alt="hero image" style="position: absolute; left: -50px; top: 0px; height: 390px; transform: scaleX(-1)" src="https://hyperstone.highgroundvision.com/images/heroes/profile/123.png" />
    <Menu />
    <Header>
      <template #title>Single Draft</template>
      <template #description>Players pick from a pool of one Strength hero, one Agility hero, and one Intelligence hero where the 3 choices are randomly picked and exclusive to that player. </template>
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
import LobbyList from '@/components/SD/LobbyList.vue'
import LobbyCreate from '@/components/SD/LobbyCreate.vue'

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
