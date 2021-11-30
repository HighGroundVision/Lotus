<template>
  <div style="background: #191919; margin-top: -5px">
    <div style="max-width: 1400px; width: 100%; margin: auto; padding: 40px 10px 100px 10px">
      <div v-if="phaseOver" style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 20px; max-width: 800px; width: 100%; margin: auto; margin-top: 5px; margin-bottom: 5px; display: flex; align-items: center">
        <div style="padding: 20px">
          <div style="font-size: 30px; margin-bottom: 5px">Draft Complete</div>
          <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">
            <p>You as the host need to enter the console commands. There are two button below that will do this quickly.</p>
            <p>Also as the lobby host you can also set the Shuffling Player option to Off if you want the player to have the hero they drafted and players will need to be the correct slot in lobby.</p>
          </div>
        </div>
      </div>

      <div class="herogridpage_FilterContainer_2dEVd">
        <div class="herogridpage_FilterLabel_1Mwn_ small">Phase: {{ phase }}</div>
        <div v-if="phaseDraft" class="herogridpage_FilterLabel_1Mwn_ large" style="text-align: center">{{ radiantClock }} <img src="@/assets/arrow-radiant.svg" style="width: 16px" /> <img src="@/assets/arrow-dire.svg" style="width: 16px" /> {{ direClock }}</div>
        <div style="display: flex; align-items: center; justify-content: flex-end">
          <div v-if="phaseReady" class="jnbrig" data-tooltip="up" aria-label="Moves to pick phase when all players are in the correct slot." @click="playersReady">
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
      <div>
        <div style="display: flex; flex-wrap: wrap; padding-top: 20px">
          <div style="flex: 1 0 4%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #000; border-radius: 5px" class="cqvqpi">
            <div style="text-align: center; width: 100%; min-height: 20px; background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))">
              <div style="width: 100%; font-size: 0.8em; text-transform: uppercase">Radiant</div>
            </div>
            <img src="https://hyperstone.highgroundvision.com/images/towers/radiant/full.png" style="width: 100%; padding: 5px; margin: auto" />
          </div>
          <template v-for="(item, index) in sequence.filter((i) => i.team == 1)" :key="index">
            <div v-if="item.stage == 'ban' && (phaseReady || phaseDraft)" style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #ca3535; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #ca3535">
                <div style="text-transform: uppercase">{{ item.stage }}</div>
              </div>
              <img v-if="item.hero" :src="item.hero.image_portrait" class="hero-roster" />
              <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #ca3535">
                {{ item.id }}
              </div>
            </div>
            <div v-else-if="item.stage == 'pick'" style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #55c897; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #55c897">
                <div style="text-transform: uppercase">{{ item.stage }}</div>
              </div>
              <img v-if="item.hero" :src="item.hero.image_portrait" class="hero-roster" />
              <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #55c897">
                <span v-if="phaseReady || phaseDraft">{{ item.id }}</span>
              </div>
            </div>
            <div v-else-if="item.stage == 'extra'" style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #3498db; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #3498db">
                <div style="text-transform: uppercase">{{ item.stage }}</div>
              </div>
              <img v-if="item.hero" :src="item.hero.image_portrait" class="hero-roster" />
              <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #3498db">
                <span v-if="phaseReady || phaseDraft">{{ item.id }}</span>
              </div>
            </div>
          </template>
        </div>
        <hr />
        <div style="display: flex; flex-wrap: wrap">
          <div style="flex: 1 0 4%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #000; border-radius: 5px" class="cqvqpa">
            <img src="https://hyperstone.highgroundvision.com/images/towers/dire/full.png" style="width: 100%; padding: 5px; margin: auto" />
            <div style="text-align: center; width: 100%; min-height: 20px; background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))">
              <div style="width: 100%; font-size: 0.8em; text-transform: uppercase">Dire</div>
            </div>
          </div>
          <template v-for="(item, index) in sequence.filter((i) => i.team == 2)" :key="index">
            <div v-if="item.stage == 'ban' && (phaseReady || phaseDraft)" style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #ca3535; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #ca3535">
                {{ item.id }}
              </div>
              <img v-if="item.hero" :src="item.hero.image_portrait" class="hero-roster" />
              <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #ca3535">
                <div style="text-transform: uppercase">{{ item.stage }}</div>
              </div>
            </div>
            <div v-else-if="item.stage == 'pick'" style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #55c897; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #55c897">
                <span v-if="phaseReady || phaseDraft">{{ item.id }}</span>
              </div>
              <img v-if="item.hero" :src="item.hero.image_portrait" class="hero-roster" />
              <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #55c897">
                <div style="text-transform: uppercase">{{ item.stage }}</div>
              </div>
            </div>
            <div v-else-if="item.stage == 'extra'" style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #3498db; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #3498db">
                <span v-if="phaseReady || phaseDraft">{{ item.id }}</span>
              </div>
              <img v-if="item.hero" :src="item.hero.image_portrait" class="hero-roster" />
              <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #3498db">
                <div style="text-transform: uppercase">{{ item.stage }}</div>
              </div>
            </div>
          </template>
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
  computed: {
    ...mapGetters(['activePlayer', 'lastestTimestamp', 'radiantTimeUsage', 'direTimeUsage', 'phase', 'phaseReady', 'phaseDraft', 'phaseOrder', 'phaseOver', 'sequence', 'commands', 'launch']),
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
  methods: {
    ...mapActions(['playersReady']),
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

.hero-roster {
  padding: 5px;
  margin: auto;
  width: 100%;
  border-radius: 10px;
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
</style>
