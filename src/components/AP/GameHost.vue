<template>
  <div style="padding: 10px 30px 30px 30px; background: #191919">
    <div v-if="phaseOver" style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 20px; max-width: 800px; width: 100%; margin: auto; margin-top: 5px; margin-bottom: 0px; display: flex; align-items: center">
      <div style="padding: 20px">
        <div style="font-size: 30px; margin-bottom: 5px">Draft Complete</div>
        <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">
          <p>You as the host need to enter the console commands. There are two button below that will do this quickly.</p>
          <p>Also as the lobby host you can also set the Shuffling Player option to Off if you want the player to have the hero they drafted and players will need to be the correct slot in lobby.</p>
        </div>
      </div>
    </div>

    <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 10px 100px 10px">
      <div class="herogridpage_FilterContainer_2dEVd">
        <div class="herogridpage_FilterLabel_1Mwn_">Phase: {{ phase }}</div>
        <div class="herogridpage_FilterLabel_1Mwn_">{{ clock }}</div>
        <div style="display: flex; align-items: center; justify-content: flex-end">
          <div v-if="phaseReady" class="jnbrig" data-tooltip="up" aria-label="Moves to pick phase when all players are in the correct slot." @click="next">
            <img src="@/assets/ready.svg" />
          </div>
          <div v-if="phaseOver" class="jnbrig" data-tooltip="up" aria-label="Copy the commands to clipboard; ready to paste into the Dota console." @click="copy">
            <img src="@/assets/copy.svg" />
          </div>
          <div v-if="phaseOver" class="jnbrig" data-tooltip="up" aria-label="Opens Dota via the browser and sets commands via the launch options automaticly." @click="start">
            <img src="@/assets/dota.svg" />
          </div>
        </div>
      </div>
      <div style="display: flex; flex-wrap: wrap; padding-top: 20px">
        <div style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #000; border-radius: 5px" class="cqvqpi">
          <div style="text-align: center; width: 100%; min-height: 20px; background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))">
            <div style="width: 100%">Radiant</div>
          </div>
          <img src="https://hyperstone.highgroundvision.com/images/towers/radiant/full.png" style="width: 100%; padding: 5px; margin: auto" />
        </div>
        <template v-for="(item, index) in picks.slice(0, 5)" :key="index">
          <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px" :style="{ 'border-color': item.player.isConnected ? '#1d8348' : '#922B21' }">
            <div style="text-align: center; width: 100%; min-height: 20px" :style="{ background: item.player.isConnected ? '#1d8348' : '#922B21' }">
              <div class="cut-text">{{ item.player.name ?? 'Slot ' + (index + 1) }}</div>
            </div>
            <img v-if="item.hero" :src="item.hero.image_portrait" style="width: 100%; border-radius: 5px 5px 0px 0px" />
            <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg" style="width: 100%; border-radius: 5px 5px 0px 0px" />
            <div style="text-align: center; width: 100%; min-height: 20px" :style="{ background: item.player.isConnected ? '#1d8348' : '#922B21' }">
              <div style="font-size: 0.8em"></div>
            </div>
          </div>
        </template>
        <div v-if="extrasFlag == 1" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #21618c; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background-color: #21618c">
            <div style="width: 100%">Extra</div>
          </div>
          <div class="bkcanr">
            <div class="cqfdfjkd" :style="{ '-webkit-mask': 'url(' + require('@/assets/random.svg') + ')' }" />
          </div>
          <div style="text-align: center; width: 100%; min-height: 20px; background: #21618c">
            <div style="font-size: 0.8em; padding-top: 2px">Random</div>
          </div>
        </div>
        <div v-if="extrasFlag == 2" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #21618c; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background-color: #21618c">
            <div style="width: 100%">Extra</div>
          </div>
          <img :src="extraRadiantImage" class="hero-roster" />
          <div style="text-align: center; width: 100%; min-height: 20px; background: #21618c">
            <div style="font-size: 0.8em; padding-top: 2px">Host Choice</div>
          </div>
        </div>
      </div>
      <hr />
      <div style="display: flex; flex-wrap: wrap">
        <div style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #000; border-radius: 5px" class="cqvqpa">
          <div style="text-align: center; width: 100%; min-height: 20px; background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))">
            <div style="width: 100%">Dire</div>
          </div>
          <img src="https://hyperstone.highgroundvision.com/images/towers/dire/full.png" style="width: 100%; padding: 5px; margin: auto" />
        </div>
        <template v-for="(item, index) in picks.slice(5, 10)" :key="index">
          <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px" :style="{ 'border-color': item.player.isConnected ? '#1d8348' : '#922B21' }">
            <div style="text-align: center; width: 100%; min-height: 20px" :style="{ background: item.player.isConnected ? '#1d8348' : '#922B21' }">
              <div class="cut-text">{{ item.player.name ?? 'Slot ' + (index + 1) }}</div>
            </div>
            <img v-if="item.hero" :src="item.hero.image_portrait" style="width: 100%; border-radius: 5px 5px 0px 0px" />
            <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg" style="width: 100%; border-radius: 5px 5px 0px 0px" />
            <div style="text-align: center; width: 100%; min-height: 20px" :style="{ background: item.player.isConnected ? '#1d8348' : '#922B21' }">
              <div v-if="item.isConnected" style="font-size: 0.8em">Connected</div>
              <div v-else style="font-size: 0.8em">Disconnected</div>
            </div>
          </div>
        </template>
        <div v-if="extrasFlag == 1" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #21618c; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background-color: #21618c">
            <div style="width: 100%">Extra</div>
          </div>
          <div class="bkcanr">
            <div class="cqfdfjkd" :style="{ '-webkit-mask': 'url(' + require('@/assets/random.svg') + ')' }" />
          </div>
          <div style="text-align: center; width: 100%; min-height: 20px; background: #21618c">
            <div style="font-size: 0.8em; padding-top: 2px">Random</div>
          </div>
        </div>
        <div v-if="extrasFlag == 2" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #21618c; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background-color: #21618c">
            <div style="width: 100%">Extra</div>
          </div>
          <img :src="extraDireImage" class="hero-roster" />
          <div style="text-align: center; width: 100%; min-height: 20px; background: #21618c">
            <div style="font-size: 0.8em; padding-top: 2px">Host Choice</div>
          </div>
        </div>
      </div>

      <div v-if="phaseExtra && extrasFlag == 2" style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 30px; margin-bottom: 20px; display: flex; align-items: center">
        <div style="padding: 20px">
          <div style="font-size: 30px; margin-bottom: 5px">Extras</div>
          <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">With this option you as the host select the extra heroes</div>
          <div style="display: flex">
            <div style="margin: 10px">
              <Multiselect v-model="extraRadiant" mode="single" :options="extraOptions" label="name" value-prop="id" :can-clear="false" :filterResults="false" class="hero-icon-select-purple">
                <template #singlelabel="{ value }">
                  <span style="font-size: 0.8em">{{ value.name }}</span>
                </template>
                <template #option="{ option }">
                  <img :src="option.image_icon" />
                  <span style="font-size: 0.8em">{{ option.name }}</span>
                </template>
              </Multiselect>
            </div>
            <div style="margin: 10px">
              <Multiselect v-model="extraDire" mode="single" :options="extraOptions" label="name" value-prop="id" :can-clear="false" :filterResults="false" class="hero-icon-select-purple">
                <template #singleLabel="{ value }">
                  <img :src="value.image_icon" />
                  <span style="font-size: 0.8em">{{ value.name }}</span>
                </template>
                <template #option="{ option }">
                  <img :src="option.image_icon" />
                  <span style="font-size: 0.8em">{{ option.name }}</span>
                </template>
              </Multiselect>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('ap/game')

function formmatTime(timeStamp) {
  let milliseconds = timeStamp - Date.now()
  let seconds = Math.floor(milliseconds / 1000)
  if (seconds > 0) {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  } else {
    return `00:00`
  }
}

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      interval: null,
      clock: '##:##',
    }
  },
  computed: {
    ...mapGetters(['heroes', 'bans', 'picks', 'banTimeStamp', 'pickTimeStamp', 'phase', 'phaseReady', 'phaseBan', 'phasePick', 'phaseExtra', 'phaseOver', 'extrasFlag', 'extraRadiantImage', 'extraDireImage', 'commands', 'launch']),
    extraRadiant: {
      get() {
        return this.$store.state.ap.game.G.picks[11]
      },
      set(value) {
        this.$store.dispatch('ap/game/extra', { index: 11, id: value })
      },
    },
    extraDire: {
      get() {
        return this.$store.state.ap.game.G.picks[12]
      },
      set(value) {
        this.$store.dispatch('ap/game/extra', { index: 12, id: value })
      },
    },
  },
  watch: {
    clock(after) {
      if (after == '00:00') {
        this.next()
      }
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.banTimeStamp) {
        this.clock = formmatTime(this.banTimeStamp)
      } else if (this.pickTimeStamp) {
        this.clock = formmatTime(this.pickTimeStamp)
      } else {
        this.clock = '##:##'
      }
    }, 1000)
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions(['next']),
    extraOptions() {
      return new Promise((resolve) => {
        resolve(this.heroes)
      })
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
.small-purple {
  min-width: 150px;
  margin-top: 10px;
}

.cut-text {
  padding: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 1.2em;
  white-space: nowrap;
}

.hero-roster {
  padding: 5px;
  margin: auto;
  width: 100%;
  border-radius: 10px;
}

.hero-selection {
  width: 90%;
  border-radius: 10px;
  border-bottom: 5px solid #17202a;
}

.selected {
  border-color: #f0f3f4;
}
.not-selected {
  border-color: #17202a;
  filter: brightness(20%);
}

.hero-int {
  width: 95%;
  margin: 10px;
  border-radius: 20px;
  border-color: #3498db;
  border-radius: 5px;
  cursor: pointer;
}

.hero-agi {
  width: 95%;
  margin: 10px;
  border-radius: 20px;
  border-color: #55c897;
  border-radius: 5px;
  cursor: pointer;
}
.hero-str {
  width: 95%;
  margin: 10px;
  border-radius: 20px;
  border-color: #ca3535;
  border-radius: 5px;
  cursor: pointer;
}

.isReady {
  margin: 5px;
  border: 1px solid #2298e7;
  border-radius: 5px;
}

.isConnected {
  margin: 5px;
  border: 1px solid #1d8348;
  border-radius: 5px;
}
.disConnected {
  margin: 5px;
  border: 1px solid #922b21;
  border-radius: 5px;
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

.jnbrig:hover {
  background: #6161ab;
  border: 2px solid #00000040 !important;
}

.jnbria {
  background-color: #52be80;
  padding: 12px 20px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid rgb(34, 34, 34);
  height: 50px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  margin-right: 2px;
}

.herogridpage_FilterContainer_2dEVd {
  width: 100%;
  max-width: 100%;
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
  width: 250px;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 10px;
  margin-left: 10px;
}

.cqvqpi {
  background: linear-gradient(-45deg, #d35400, #9734de, #ffa233, #591f82);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
  width: 100%;
}
.cqvqpa {
  background: linear-gradient(-45deg, #591f82, #ffa233, #9734de, #d35400);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
  width: 100%;
}

.cqfdfjkd {
  width: 128px;
  height: 128px;
  background: linear-gradient(-45deg, #d35400, #9734de, #ffa233, #591f82);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
  background-repeat: no-repeat;
}

.bkcanr {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center; /* vertical */
  justify-content: center; /* horizontal */
}
</style>
