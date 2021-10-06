<template>
  <div>
    <img alt="hero image" style="position: absolute; left: -100px; top: -50px; height: 390px" src="https://hyperstone.highgroundvision.com/images/heroes/profile/128.png" />
    <Menu />
    <Header>
      <template #title>Host Choice</template>
      <template #description> As the lobby host you select the heroes and their team (Radiant/Dire/Extra) to create the roster for the draft. You do not have submit a complete lineup, the remain slots will be random. </template>
    </Header>
    <Roster />
    <HeroGrid />
    <Footer />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import HeroGrid from '@/components/HC/HeroGrid.vue'
import Roster from '@/components/HC/Roster.vue'

// TODO: Check for Class B heroes

export default {
  components: {
    Menu,
    Header,
    Footer,
    Roster,
    HeroGrid,
  },
  setup() {},
}
</script>

<style scoped></style>
