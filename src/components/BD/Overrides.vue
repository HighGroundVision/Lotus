<template>
  <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 5px; width: 40%; margin: auto; margin-top: 10px; margin-bottom: 10px; margin-left: 5px; display: flex; align-items: center">
    <div style="padding: 10px; width: 100%; height: 100%">
      <div style="font-size: 30px; margin-bottom: 5px">Overrides</div>
      <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">
        <div style="padding: 2px">
          <Toggle v-model="randomizeRadiant" class="toggle-purple" />
          <span> Randomize Radiant</span>
        </div>
        <div style="padding: 2px">
          <Toggle v-model="randomizeDire" class="toggle-purple" />
          <span> Randomize Dire</span>
        </div>
        <div style="padding: 2px">
          <Toggle v-model="randomizeExtras" class="toggle-purple" />
          <span> Randomize Extras</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from '@vueform/toggle'

export default {
  data() {
    return {}
  },
  components: {
    Toggle,
  },
  computed: {
    randomizeRadiant: {
      get() {
        return this.$store.state.bd.randomizeRadiant
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'randomizeRadiant', value: value })
      },
    },
    randomizeDire: {
      get() {
        return this.$store.state.bd.randomizeDire
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'randomizeDire', value: value })
      },
    },
    randomizeExtras: {
      get() {
        return this.$store.state.bd.randomizeExtras
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'randomizeExtras', value: value })
      },
    },
  },
  methods: {},
}
</script>

<style scoped>
.toggle-purple {
  --toggle-bg-on: #6161ab;
  --toggle-border-on: #6161ab;
}
</style>
