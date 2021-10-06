<template>
  <div style="padding: 10px 30px 30px 30px; background: #191919">
    <div v-if="phaseExtra || phaseOver">
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
          <template v-for="(item, index) in picks.slice(0, 5)" :key="index">
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
          <div v-if="extrasFlag == 1" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
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
          <div v-if="extrasFlag == 1" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
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
    <div v-if="phaseBan || phasePick">
      <div style="display: flex; padding: 10px">
        <div style="width: 100%; display: flex; justify-content: flex-end">
          <template v-for="(item, index) in picks.slice(0, 5)" :key="index">
            <div style="width: 100%; margin: 5px; text-align: center; border-radius: 5px" :style="{ 'background-color': '#666' }">
              <img v-if="item.hero" :src="item.hero.image_banner" style="width: 100%; border-radius: 5px 5px 0px 0px" />
              <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" style="width: 100%; border-radius: 5px 5px 0px 0px" />
              <div class="cut-text">{{ item.player.name ?? 'Slot ' + (index + 1) }}</div>
            </div>
          </template>
        </div>
        <div style="width: 120px; text-align: center; padding: 5px; margin: 10px">
          <div style="font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin-top: 15px">
            {{ phase }} <br />
            {{ clock }}
          </div>
        </div>
        <div style="width: 100%; display: flex">
          <template v-for="(item, index) in picks.slice(5, 10)" :key="index">
            <div style="width: 100%; margin: 5px; text-align: center; border-radius: 5px" :style="{ 'background-color': '#666' }">
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
                <img :src="hero.image_portrait" class="button-hero" :style="getHeroImageStyle(hero)" @click="selectHero(hero)" />
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
                <img :src="hero.image_portrait" class="button-hero" :style="getHeroImageStyle(hero)" @click="selectHero(hero)" />
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
                <img :src="hero.image_portrait" class="button-hero" :style="getHeroImageStyle(hero)" @click="selectHero(hero)" />
              </template>
            </div>
          </div>
        </div>
        <div style="width: 20%; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 10px">
          <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between">
            <div style="text-align: center">
              <h3 v-if="phaseBan">CHOOSE YOUR BAN</h3>
              <h3 v-if="phasePick">CHOOSE YOUR PICK</h3>
              <div v-if="picked && phasePick">
                <img :src="picked.image_profile" style="width: 100%" />
              </div>
              <div v-else-if="baned && phaseBan">
                <img :src="baned.image_profile" style="width: 100%" />
              </div>
              <div v-else-if="choice">
                <img :src="choice.image_profile" style="width: 100%" />
              </div>
              <div v-else class="bkcanr">
                <div class="cqfdfjkd" :style="{ '-webkit-mask': 'url(' + require('@/assets/profile.svg') + ')' }" />
              </div>
            </div>
            <div v-if="phaseBan" style="display: flex">
              <div v-if="baned" class="jnbria" style="width: 100%">
                <div style="font-size: 0.8em">BANNED</div>
                <div>{{ baned.name }}</div>
              </div>
              <div v-else-if="choice" class="jnbrig" style="width: 100%" @click="banHero">
                <div style="font-size: 0.8em">BAN</div>
                <div>{{ choice.name }}</div>
              </div>
              <div v-else class="jnbria" style="width: 100%">
                <div style="font-size: 0.8em">BAN</div>
              </div>
            </div>
            <div v-if="phasePick" style="display: flex">
              <div v-if="picked" class="jnbria" style="width: 100%">
                <div style="font-size: 0.8em">SELECTED</div>
                <div>{{ picked.name }}</div>
              </div>
              <div v-else-if="choice" class="jnbrig" style="width: 80%" @click="pickHero">
                <div style="font-size: 0.8em">LOCK IN</div>
                <div>{{ choice.name }}</div>
              </div>
              <div v-else class="jnbria" style="width: 80%">
                <div style="font-size: 0.8em">LOCK IN</div>
              </div>
              <div v-if="!picked" style="width: 20%">
                <div class="jnbrig" data-tooltip="left" aria-label="Randomly selects a hero from the aviable options left." @click="pickRandom">
                  <img src="@/assets/random.svg" style="width: 100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/assets/heroes.json'

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('ap/game')

function getSeconds(timeStamp) {
  let milliseconds = timeStamp - Date.now()
  let seconds = Math.floor(milliseconds / 1000)
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
      clock: '##:##',
      choice: null,
    }
  },
  computed: {
    ...mapGetters(['bans', 'baned', 'picks', 'picked', 'banTimeStamp', 'pickTimeStamp', 'phase', 'phaseExtra', 'phaseReady', 'phaseBan', 'phasePick', 'phaseOver', 'extrasFlag', 'extraRadiantImage', 'extraDireImage']),
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
    ...mapActions(['ban', 'pick', 'random']),
    selectHero(hero) {
      if (this.bans.map((i) => i.hero?.id).includes(hero.id)) {
        return
      }
      if (this.picks.map((i) => i.hero?.id).includes(hero.id)) {
        return
      }

      this.choice = hero
    },
    banHero() {
      if (!this.choice) {
        return
      }

      this.ban(this.choice.id)
      this.choice = null
    },
    pickHero() {
      if (!this.choice) {
        return
      }

      this.pick(this.choice.id)
      this.choice = null
    },
    pickRandom() {
      if (this.picked) {
        return
      }

      this.random()
      this.choice = null
    },
    getHeroImageStyle(hero) {
      if (this.bans.map((i) => i.hero?.id).includes(hero.id)) {
        return '-webkit-filter: invert(40%) grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2); filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8); border: 2px solid red;'
      }
      if (this.picks.map((i) => i.hero?.id).includes(hero.id)) {
        return '-webkit-filter: invert(40%) grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2); filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8); border: 2px solid red;'
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
