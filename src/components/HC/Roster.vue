<template>
  <div style="background: #191919; margin-top: -5px; padding-top: 50px">
    <div style="max-width: 1200px; width: 100%; margin: auto">
      <div>
        <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 5px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 10px; display: flex; align-items: center">
          <div style="padding: 10px; width: 100%">
            <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5); float: right; margin: 5px">For these options to work the lobby's Location should be set to LOCALHOST</div>
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
      </div>
      <div class="herogridpage_FilterContainer_2dEVd">
        <div class="herogridpage_FilterLabel_1Mwn_">Select Roster</div>
        <div style="display: flex; align-items: center; justify-content: flex-end">
          <div class="jnbrig" data-tooltip="up" aria-label="Clear Roster" @click="clear">
            <img src="@/assets/clear.svg" />
          </div>
          <div class="jnbrig" data-tooltip="up" aria-label="Copy the commands to clipboard; ready to paste into the Dota console." @click="copy">
            <img src="@/assets/copy.svg" />
          </div>
          <div class="jnbrig" data-tooltip="up" aria-label="Opens Dota via the browser and sets commands via the launch options automaticly." @click="start">
            <img src="@/assets/dota.svg" />
          </div>
        </div>
      </div>
      <div style="margin-top: 20px">
        <draggable v-model="selection" group="roster" style="display: inline" @start="drag = true" @end="drag = false">
          <template #item="{ element, index }">
            <img v-if="element.image_banner" :src="element.image_banner" class="grabbable" :class="getHeroRosterClass(index)" />
            <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" :class="getHeroRosterClass(index)" />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import draggable from 'vuedraggable'
import Slider from '@vueform/slider'
import Toggle from '@vueform/toggle'

const { mapActions, mapGetters } = createNamespacedHelpers('hc') //mapState,

export default {
  components: {
    draggable,
    Slider,
    Toggle,
  },
  data() {
    return {
      drag: false,
    }
  },
  computed: {
    ...mapGetters(['commands', 'launch']),
    selection: {
      get() {
        return this.$store.state.hc.selection
      },
      set(value) {
        this.$store.dispatch('hc/update', value)
      },
    },
    playerShuffle: {
      get() {
        return this.$store.state.hc.playerShuffle
      },
      set(value) {
        this.$store.commit('hc/setPlayerShuffle', value)
      },
    },
    draftTime: {
      get() {
        return this.$store.state.hc.draftTime
      },
      set(value) {
        this.$store.commit('hc/setDraftTime', value)
      },
    },
    roundTime: {
      get() {
        return this.$store.state.hc.roundTime
      },
      set(value) {
        this.$store.commit('hc/setRoundTime', value)
      },
    },
    pickTime: {
      get() {
        return this.$store.state.hc.pickTime
      },
      set(value) {
        this.$store.commit('hc/setPickTime', value)
      },
    },
    placeholders: function () {
      let size = this.$store.state.hc.selection.length
      let collection = []
      for (let i = size; i < 12; i++) {
        collection.push(i)
      }
      return collection
    },
  },
  methods: {
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
    ...mapActions(['select', 'clear', 'order']),
  },
}
</script>

<style scoped>
.item {
  flex: 1;
  margin: 0 1%;
  text-align: center;
}
.container {
  display: flex;
  padding: 0 1%;
}

.sortable-chosen.sortable-ghost {
  opacity: 0;
}
.sortable-fallback {
  opacity: 1 !important;
}
.grabbable {
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

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

.herogridpage_FilterContainer_2dEVd .herogridpage_FilterLabel_1Mwn_ {
  color: #fff;
  width: 180px;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
