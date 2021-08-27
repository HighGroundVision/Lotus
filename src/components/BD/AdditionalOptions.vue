<template>
  <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 5px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 10px; display: flex; align-items: center">
    <div style="padding: 10px; width: 100%">
      <div style="font-size: 14px; color: #4d749e; font-style: italic; float: right; margin: 5px">For these options to work the lobby's Location should be set to LOCALHOST</div>
      <div style="font-size: 30px; margin-bottom: 5px">Additional Options</div>
      <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">
        <div style="display: flex; padding: 0 1%">
          <div style="flex: 1; margin: 0 1%">
            <p style="margin-bottom: 30px">Player Shuffle <span v-if="playerShuffle">Enabled</span><span v-else>Disabled</span></p>
            <Toggle v-model="playerShuffle" class="toggle-purple" />
          </div>
          <div style="flex: 1; margin: 0 1%">
            <p style="margin-bottom: 40px">Pick Time</p>
            <Slider v-model="pickTime" :min="1" :max="10" class="slider-purple" />
          </div>
          <div style="flex: 1; margin: 0 1%">
            <p style="margin-bottom: 40px">Round Time</p>
            <Slider v-model="roundTime" :min="1" :max="30" class="slider-purple" />
          </div>
          <div style="flex: 1; margin: 0 1%">
            <p style="margin-bottom: 40px">Draft Time</p>
            <Slider v-model="draftTime" :min="10" :max="120" class="slider-purple" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@vueform/slider'
import Toggle from '@vueform/toggle'

export default {
  data() {
    return {}
  },
  components: {
    Slider,
    Toggle,
  },
  computed: {
    playerShuffle: {
      get() {
        return this.$store.state.bd.playerShuffle
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'playerShuffle', value: value })
      },
    },
    draftTime: {
      get() {
        return this.$store.state.bd.draftTime
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'draftTime', value: value })
      },
    },
    roundTime: {
      get() {
        return this.$store.state.bd.roundTime
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'roundTime', value: value })
      },
    },
    pickTime: {
      get() {
        return this.$store.state.bd.pickTime
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'pickTime', value: value })
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

.slider-purple {
  --slider-connect-bg: #6161ab;
  --slider-tooltip-bg: #6161ab;
  --slider-handle-ring-color: #7b61ab;
}
</style>
