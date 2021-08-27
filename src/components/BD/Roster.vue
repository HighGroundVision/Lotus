<template>
  <div style="max-width: 600px; width: 100%; margin: auto; text-align: center; margin-top: 50px; margin-bottom: 50px">
    <div @click="generate" class="jnbrig" style="">
      <span style="font-size: 1.2em"> Generate</span>
    </div>
  </div>
  <div style="margin-top: 50px">
    <div class="herogridpage_FilterContainer_2dEVd">
      <div class="herogridpage_FilterLabel_1Mwn_">Generated Roster</div>
      <div style="display: flex; align-items: center; justify-content: flex-end">
        <div @click="clear" class="jnbrig" data-tooltip="up" aria-label="Clear Roster">
          <img src="@/assets/clear.svg" />
        </div>
        <div @click="copy" class="jnbrig" data-tooltip="up" aria-label="Copy the commands to clipboard; ready to paste into the Dota console.">
          <img src="@/assets/copy.svg" />
        </div>
        <div @click="start" class="jnbrig" data-tooltip="up" aria-label="Opens Dota via the browser and sets commands via the launch options automaticly.">
          <img src="@/assets/dota.svg" />
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <template v-for="(item, index) in selection" :key="index">
        <img v-if="item" :src="item.image_banner" v-bind:class="getHeroRosterClass(index)" />
        <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" v-bind:class="getHeroRosterClass(index)" />
      </template>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('bd')

export default {
  data() {
    return {}
  },
  components: {},
  computed: {
    ...mapGetters(['commands', 'launch']),
    selection: {
      get() {
        return this.$store.state.bd.selection
      },
      set(value) {
        this.$store.dispatch('bd/update', value)
      },
    },
    placeholders: function () {
      let size = this.$store.state.bd.selection.length
      let collection = []
      for (let i = size; i < 12; i++) {
        collection.push(i)
      }
      return collection
    },
  },
  methods: {
    ...mapActions(['generate', 'clear']),
    getHeroRosterClass(index) {
      return { 'hero-roster': true, 'hero-roster-radiant': index < 5, 'hero-roster-dire': index >= 5 && index < 10, 'hero-roster-extra': index >= 10 }
    },
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

<style scoped>
.hero-roster {
  width: 96px;
  padding: 2px;
  margin: 2px;
  border-radius: 5px;
}
.hero-roster-radiant {
  border: 1px solid #55c897;
}
.hero-roster-dire {
  border: 1px solid #ca3535;
}
.hero-roster-extra {
  border: 1px solid #7883e7;
}

/* tooltip */
[data-tooltip][aria-label] {
  position: relative;
}
[data-tooltip][aria-label]::before {
  content: attr(aria-label);
  pointer-events: none;
  white-space: pre;
  position: absolute;
  color: #fff;
  background: #555;
  padding: 0.3rem 2rem;
  border-radius: 0.3rem;
  opacity: 0;
  visibility: none;
}
[data-tooltip][aria-label]::after {
  content: '';
  pointer-events: none;
  width: 0;
  height: 0;
  position: absolute;
  border-color: #555;
  border-width: 0;
  border-style: solid;
  opacity: 0;
  visibility: none;
}
[data-tooltip^='up'][aria-label]::before {
  bottom: calc(0.5rem + 100%);
  right: 50%;
  transform: translateX(50%);
}
[data-tooltip^='up'][aria-label]::after {
  border-top-width: 0.5rem;
  border-right-width: 0.5rem;
  border-right-color: #0000;
  border-left-width: 0.5rem;
  border-left-color: #0000;
  bottom: 100%;
  right: 50%;
  transform: translateX(50%);
}
[data-tooltip^='down'][aria-label]::before {
  top: calc(0.5rem + 100%);
  right: 50%;
  transform: translateX(50%);
}
[data-tooltip^='down'][aria-label]::after {
  border-bottom-width: 0.5rem;
  border-right-width: 0.5rem;
  border-right-color: #0000;
  border-left-width: 0.5rem;
  border-left-color: #0000;
  top: 100%;
  right: 50%;
  transform: translateX(50%);
}
[data-tooltip^='left'][aria-label]::before {
  right: calc(1rem + 100%);
  bottom: 50%;
  transform: translateY(50%);
}
[data-tooltip^='left'][aria-label]::after {
  border-left-width: 0.5rem;
  border-top-width: 0.5rem;
  border-top-color: #0000;
  border-bottom-width: 0.5rem;
  border-bottom-color: #0000;
  bottom: 50%;
  right: calc(0.5rem + 100%);
  transform: translateY(50%);
}
[data-tooltip^='right'][aria-label]::before {
  left: calc(1rem + 100%);
  bottom: 50%;
  transform: translateY(50%);
}
[data-tooltip^='right'][aria-label]::after {
  border-right-width: 0.5rem;
  border-top-width: 0.5rem;
  border-top-color: #0000;
  border-bottom-width: 0.5rem;
  border-bottom-color: #0000;
  bottom: 50%;
  left: calc(0.5rem + 100%);
  transform: translateY(50%);
}
[data-tooltip][aria-label]:hover::before,
[data-tooltip][aria-label]:hover::after {
  visibility: visible;
  opacity: 1;
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}
[data-tooltip$='100'][aria-label]:hover::before,
[data-tooltip$='100'][aria-label]:hover::after {
  transition-delay: 0.1s;
}
[data-tooltip$='500'][aria-label]:hover::before,
[data-tooltip$='500'][aria-label]:hover::after {
  transition-delay: 0.5s;
}
[data-tooltip$='1000'][aria-label]:hover::before,
[data-tooltip$='1000'][aria-label]:hover::after {
  transition-delay: 1s;
}
.jnbrig {
  background-color: rgb(89, 31, 130);
  padding: 12px 20px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid rgb(34, 34, 34);
  height: 50px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  margin-right: 2px;
}

/*!sc*/
.jnbrig:hover {
  background: #6161ab;
  border: 2px solid #00000040 !important;
}

.herogridpage_FilterContainer_2dEVd {
  width: 100%;
  max-width: 1200px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #11111190;
  box-shadow: 0px 0px 30px #00000050;
  margin-top: 20px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
}

.herogridpage_FilterLabel_1Mwn_ {
  color: #fff;
  width: 200px;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 10px;
  margin-left: 10px;
}

.herogridpage_SpecificFilterContainer_30qnj {
  width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
}

.herogridpage_SelectorLabel_1Y7hg {
  color: #808fa6;
  font-size: 17px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 20px;
}

.herogridpage_Filter_N74aa {
  width: 43px;
  height: 35px;
  margin-left: -4px;
  background-size: cover;
  background-repeat: no-repeat;
  transition-property: filter;
  transition-timing-function: ease-in-out;
  transition-duration: 0.1s;
  cursor: pointer;
  color: #fff;
  filter: brightness(0.5) saturate(0);
}
</style>
