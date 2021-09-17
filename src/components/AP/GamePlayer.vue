<template>
  <div style="padding: 10px 30px 30px 30px; background: #191919">
    <div v-if="phaseOver">
      <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 20px; max-width: 800px; width: 100%; margin: auto; margin-top: 5px; margin-bottom: 20px; display: flex; align-items: center">
        <div style="padding: 20px">
          <div style="font-size: 30px; margin-bottom: 5px">Draft Complete</div>
          <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">The phase of the draft is over wait for the host to enter the console commands and start the Dota match.</div>
        </div>
      </div>
      <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 10px 100px 10px">
        <div style="display: flex; flex-wrap: wrap; padding-top: 20px">
          <div style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #000; border-radius: 5px" class="cqvqpi">
            <div style="text-align: center; width: 100%; min-height: 20px; background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))">
              <div style="width: 100%">Radiant</div>
            </div>
            <img src="https://hyperstone.highgroundvision.com/images/towers/radiant/full.png" style="width: 100%; padding: 5px; margin: auto" />
          </div>
          <template v-for="(item, index) in selection.slice(0, 5)" :key="index">
            <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div class="cut-text">{{ item.player.name ?? 'Slot ' + (index + 1) }}</div>
              </div>
              <img :src="item.hero.image_portrait" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div style="font-size: 0.8em"></div>
              </div>
            </div>
          </template>
          <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
            <div style="text-align: center; width: 100%; min-height: 20px; background-color: #616a6b">
              <div style="width: 100%">Extra</div>
            </div>
            <div class="bkcanr">
              <div class="fghkj6gh" :style="{ '-webkit-mask': 'url(' + require('@/assets/random.svg') + ')', mask: 'url(' + require('@/assets/random.svg') + ')' }" />
            </div>
            <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
              <div style="font-size: 0.8em; padding-top: 2px"></div>
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
          <template v-for="(item, index) in selection.slice(5, 10)" :key="index">
            <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div class="cut-text">{{ item.player.name ?? 'Slot ' + (index + 1) }}</div>
              </div>
              <img :src="item.hero.image_portrait" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div style="font-size: 0.8em"></div>
              </div>
            </div>
          </template>
          <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
            <div style="text-align: center; width: 100%; min-height: 20px; background-color: #616a6b">
              <div style="width: 100%">Extra</div>
            </div>
            <div class="bkcanr">
              <div class="fghkj6gh" :style="{ '-webkit-mask': 'url(' + require('@/assets/random.svg') + ')', mask: 'url(' + require('@/assets/random.svg') + ')' }" />
            </div>
            <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
              <div style="font-size: 0.8em; padding-top: 2px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="phaseReady">
      <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 50px; display: flex; align-items: center">
        <div style="padding: 20px">
          <div style="font-size: 30px; margin-bottom: 5px">Are you Ready?</div>
          <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">The host will advance to the pick phase when all players are in the correct slot.</div>
        </div>
      </div>
    </div>
    <div v-if="phasePick">
      <div style="display: flex; padding: 10px">
        <div style="width: 100%; display: flex; justify-content: flex-end">
          <template v-for="(item, index) in selection.slice(0, 5)" :key="index">
            <div style="width: 100%; margin: 5px; text-align: center; border-radius: 5px" v-bind:style="{ 'background-color': '#666' }">
              <img v-if="item.hero" :src="item.hero.image_banner" style="width: 100%; border-radius: 5px 5px 0px 0px" />
              <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" style="width: 100%; border-radius: 5px 5px 0px 0px" />
              <div class="cut-text">{{ item.player.name ?? 'Slot ' + (index + 1) }}</div>
            </div>
          </template>
        </div>
        <div style="width: 120px; text-align: center; padding: 5px; margin: 10px">
          <h1>{{ clock }}</h1>
        </div>
        <div style="width: 100%; display: flex">
          <template v-for="(item, index) in selection.slice(5, 10)" :key="index">
            <div style="width: 100%; margin: 5px; text-align: center; border-radius: 5px" v-bind:style="{ 'background-color': '#666' }">
              <img v-if="item.hero" :src="item.hero.image_banner" style="width: 100%; border-radius: 5px 5px 0px 0px" />
              <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" style="width: 100%; border-radius: 5px 5px 0px 0px" />
              <div class="cut-text">{{ item.player.name ?? 'Slot ' + (index + 6) }}</div>
            </div>
          </template>
        </div>
      </div>
      <div style="display: flex">
        <div style="width: 80%">
          <div style="display: flex; padding: 5px; margin: 5px">
            <div style="writing-mode: vertical-lr; text-orientation: mixed">
              <div style="text-align: center; transform: scale(-1, -1)">STRENGTH</div>
              <hr class="str-border" />
            </div>
            <div>
              <template v-for="hero in strHeroes" :key="hero.id">
                <img @click="selectHero(hero)" :src="hero.image_portrait" class="button-hero" />
              </template>
            </div>
          </div>
          <div style="display: flex; padding: 5px; margin: 5px">
            <div style="writing-mode: vertical-lr; text-orientation: mixed">
              <div style="text-align: center; transform: scale(-1, -1)">AGILITY</div>
              <hr class="agi-border" />
            </div>
            <div>
              <template v-for="hero in agiHeroes" :key="hero.id">
                <img @click="selectHero(hero)" :src="hero.image_portrait" class="button-hero" />
              </template>
            </div>
          </div>
          <div style="display: flex; padding: 5px; margin: 5px">
            <div style="writing-mode: vertical-lr; text-orientation: mixed">
              <div style="text-align: center; transform: scale(-1, -1)">INTELLIGENCE</div>
              <hr class="int-border" />
            </div>
            <div>
              <template v-for="hero in intHeroes" :key="hero.id">
                <img @click="selectHero(hero)" :src="hero.image_portrait" class="button-hero" />
              </template>
            </div>
          </div>
        </div>
        <div style="width: 20%; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 10px">
          <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between">
            <div style="text-align: center">
              <h3>CHOOSE YOUR HERO</h3>
              <div v-if="selected">
                <img :src="selected.image_profile" style="width: 100%" />
              </div>
              <div v-else-if="choice">
                <img :src="choice.image_profile" style="width: 100%" />
              </div>
              <div v-else class="bkcanr">
                <div class="cqfdfjkd" :style="{ '-webkit-mask': 'url(' + require('@/assets/profile.svg') + ')', mask: 'url(' + require('@/assets/profile.svg') + ')' }" />
              </div>
            </div>
            <div v-if="phasePick" style="display: flex">
              <div v-if="selected" class="jnbria" style="width: 100%">
                <div style="font-size: 0.8em">SELECTED</div>
                <div>{{ selected.name }}</div>
              </div>
              <div v-else-if="choice" @click="pickHero" class="jnbrig" style="width: 80%">
                <div style="font-size: 0.8em">LOCK IN</div>
                <div>{{ choice.name }}</div>
              </div>
              <div v-else class="jnbria" style="width: 80%">
                <div style="font-size: 0.8em">LOCK IN</div>
              </div>
              <div v-if="!selected" style="width: 20%">
                <div @click="pickRandom" class="jnbrig" data-tooltip="left" aria-label="Randomly selects a hero from the aviable options left.">
                  <img src="@/assets/random.svg" style="width: 100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 80px">
        <hr />
        <img v-if="timer" class="image-timer" v-bind:style="{ 'animation-duration': timer + 's' }" alt="timer" src="https://hyperstone.highgroundvision.com/images/heroes/profile/97.png" />
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/assets/heroes.json'

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('ap/game')

function formmatTime(t) {
  return t.toString().padStart(2, '0')
}

export default {
  data() {
    return {
      timeout: false,
      timer: null,
      clock: '##:##',
      choice: null,
    }
  },
  mounted() {
    let interval = null
    interval = setInterval(() => {
      if (!this.timestamp) {
        this.clock = '##:##'
        return
      }

      let milliseconds = this.timestamp - Date.now()
      let seconds = Math.floor(milliseconds / 1000)
      if (!this.timer) {
        this.timer = seconds
      }

      if (seconds < 1) {
        clearInterval(interval)
        this.timer = null
        this.clock = `00:00`
        return
      }

      const m = Math.floor(seconds / 60)
      const s = Math.floor(seconds % 60)
      this.clock = `${formmatTime(m)}:${formmatTime(s)}`
    }, 1000)
  },
  computed: {
    ...mapGetters(['selection', 'selected', 'timestamp', 'phaseReady', 'phasePick', 'phaseOver']),
    strHeroes() {
      return db
        .slice(0)
        .filter((i) => i.primary_attribute == 'STRENGTH')
        .sort((lhs, rhs) => lhs.name - rhs.name)
    },
    agiHeroes() {
      return db
        .slice(0)
        .filter((i) => i.primary_attribute == 'AGILITY')
        .sort((lhs, rhs) => lhs.name - rhs.name)
    },
    intHeroes() {
      return db
        .slice(0)
        .filter((i) => i.primary_attribute == 'INTELLECT')
        .sort((lhs, rhs) => lhs.name - rhs.name)
    },
  },
  watch: {
    clock(after) {
      this.timeout = after == '00:00'
    },
    timeout(after) {
      if (after == true) {
        this.pickRandom()
      }
    },
  },
  methods: {
    ...mapActions(['pick', 'random']),
    selectHero(hero) {
      this.choice = hero
    },
    pickHero() {
      if (this.choice) {
        this.pick(this.choice?.id)
      }
    },
    pickRandom() {
      if (!this.selected) {
        this.random()
      }
    },
  },
}
</script>

<style scoped>
@keyframes myanimation {
  from {
    left: 0;
  }
  to {
    left: 95%;
  }
}

.image-timer {
  margin-top: -120px;
  position: relative;
  height: 100px;
  top: -20px;
  animation-name: myanimation;
  animation-timing-function: linear;
}

.hero-roster {
  padding: 5px;
  margin: auto;
  width: 100%;
  border-radius: 10px;
}

.cut-text {
  /* padding: 2px; */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.button-hero {
  width: 70px;
  padding: 3px;
  border-radius: 5px;
  cursor: pointer;
}
.button-hero:hover {
  border: 2px solid white;
}

.str-border {
  border-color: #ca3535;
}
.agi-border {
  border-color: #55c897;
}
.int-border {
  border-color: #3498db;
}

.jnbrig {
  background-color: rgb(89, 31, 130);
  padding: 10px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid rgb(34, 34, 34);
  height: 60px;
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
  padding: 10px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid rgb(34, 34, 34);
  height: 60px;
  /* cursor: pointer; */
  -webkit-transition: 0.1s;
  transition: 0.1s;
  margin-right: 2px;
}

.jnbriahover {
  background: #6161ab;
  border: 2px solid #00000040 !important;
}

.bkcanr {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center; /* vertical */
  justify-content: center; /* horizontal */
}

.fghkj6gh {
  width: 128px;
  height: 128px;
  background: linear-gradient(-45deg, #d35400, #9734de, #ffa233, #591f82);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
}

.cqfdfjkd {
  margin: auto;
  width: 250px;
  height: 150px;
  background: linear-gradient(-45deg, #d35400, #9734de, #ffa233, #591f82);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
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
