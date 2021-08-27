<template>
  <div>
    <img alt="hero image" style="position: absolute; left: -50px; top: 0px; height: 390px" src="https://hyperstone.highgroundvision.com/images/heroes/profile/72.png" />
    <Menu />
    <Header>
      <template v-slot:title>Balanced Draft</template>
      <template v-slot:description>The draft is still randomly generated but there are a number of additional switches to Disqualify Heroes and/or Balance Teams. You can use these switches to create a fair draft or a complete clown festival the choice is yours.</template>
    </Header>
    <div style="background: #191919; margin-top: -5px">
      <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 0px; padding-bottom: 100px">
        <Filters />
        <div style="display: flex">
          <Balance />
          <Order />
          <Overrides />
        </div>
        <!-- -->
        <AdditionalOptions />
        <Roster />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Filters from '@/components/BD/Filters.vue'
import Balance from '@/components/BD/Balance.vue'
import Order from '@/components/BD/Order.vue'
import Overrides from '@/components/BD/Overrides.vue'
import AdditionalOptions from '@/components/BD/AdditionalOptions.vue'
import Roster from '@/components/BD/Roster.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('bd') //mapState,,

export default {
  data() {
    return {}
  },
  components: {
    Menu,
    Header,
    Footer,
    Filters,
    Balance,
    Order,
    Overrides,
    AdditionalOptions,
    Roster,
  },
  mounted() {
    if (this.$route.query.default) {
      this.$store.dispatch('bd/default', this.$route.query.default)
    }
  },
  computed: {
    ...mapGetters(['commands', 'launch']),
  },
  methods: {
    ...mapActions(['generate', 'clear']),
    copy() {
      let cmds = this.commands
      navigator.clipboard.writeText(cmds)
    },
    start() {
      let cmds = this.launch
      let params = encodeURIComponent(cmds)
      let url = 'steam://run/570//' + params
      window.open(url)
    },
  },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style src="@vueform/slider/themes/default.css"></style>
<style src="@vueform/toggle/themes/default.css"></style>
<style scoped></style>
