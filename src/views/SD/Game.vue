<template>
  <div>
    <Menu />
    <Header>
      <template v-slot:title>Single Draft</template>
      <template v-slot:description>Players pick from a pool of one Strength hero, one Agility hero, and one Intelligence hero where the 3 choices are randomly picked and exclusive to that player</template>
    </Header>
    <div style="background: #191919; margin-top: -5px">
      <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 10px 100px 10px">
        <Game />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Game from '@/components/SD/Game.vue'

export default {
  setup() {},
  components: {
    Menu,
    Header,
    Footer,
    Game,
  },
}
</script>

<style scoped></style>
