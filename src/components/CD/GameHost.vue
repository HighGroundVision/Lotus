<template>
  <div style="background: #191919; margin-top: -5px">
    <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 10px 100px 10px">
      <div class="herogridpage_FilterContainer_2dEVd">
        <div class="herogridpage_FilterLabel_1Mwn_ small">Phase: {{ phase }}</div>
        <div class="herogridpage_FilterLabel_1Mwn_ large" style="text-align: center">{{ radiantClock }} <img src="@/assets/arrow-radiant.svg" style="width: 16px" /> <img src="@/assets/arrow-dire.svg" style="width: 16px" /> {{ direClock }}</div>
        <div style="display: flex; align-items: center; justify-content: flex-end">
          <div v-if="phaseReady" @click="next" class="jnbrig" data-tooltip="up" aria-label="Moves to pick phase when all players are in the correct slot.">
            <img src="@/assets/ready.svg" />
          </div>
          <div v-if="phaseOver" @click="copy" class="jnbrig" data-tooltip="up" aria-label="Copy the commands to clipboard; ready to paste into the Dota console.">
            <img src="@/assets/copy.svg" />
          </div>
          <div v-if="phaseOver" @click="start" class="jnbrig" data-tooltip="up" aria-label="Opens Dota via the browser and sets commands via the launch options automaticly.">
            <img src="@/assets/dota.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('cd/game')

function getSeconds(timeStamp) {
  let seconds = Math.floor(timeStamp / 1000)
  return seconds > 0 ? seconds : 0
}

function formmatTime(timeStamp) {
  let seconds = getSeconds(timeStamp)
  if (seconds > 0) {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  } else {
    return `00:00`
  }
}

export default {
  data() {
    return {
      interval: null,
      radiantClock: '##:##',
      direClock: '##:##',
    }
  },
  async mounted() {
    this.interval = setInterval(() => {
      if (this.lastestTimestamp) {
        let target = 180 * 1000
        let raidantAvailable = this.activePlayer == '1' ? Date.now() - this.lastestTimestamp + this.radiantTimeUsage : this.radiantTimeUsage
        let direAvailable = this.activePlayer == '2' ? Date.now() - this.lastestTimestamp + this.direTimeUsage : this.direTimeUsage
        this.radiantClock = formmatTime(target - raidantAvailable)
        this.direClock = formmatTime(target - direAvailable)
      } else {
        this.radiantClock = '##:##'
        this.direClock = '##:##'
      }
    }, 1000)
  },
  computed: {
    ...mapGetters(['activePlayer', 'lastestTimestamp', 'radiantTimeUsage', 'direTimeUsage', 'phase', 'phaseReady', 'phaseDraft', 'phaseOver', 'commands', 'launch']),
  },
  methods: {
    ...mapActions(['next']),
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
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 10px;
  margin-left: 10px;
}

/*
.herogridpage_FilterContainer_2dEVd .herogridpage_FilterLabel_1Mwn_.small {
   width: 200px; 
}
.herogridpage_FilterContainer_2dEVd .herogridpage_FilterLabel_1Mwn_.large {
  width: 400px; 
}
*/

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
</style>
