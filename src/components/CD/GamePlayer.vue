<template>
  <div style="padding: 10px 30px 30px 30px; background: #191919">
    <div v-if="phaseReady">
      <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 50px; display: flex; align-items: center">
        <div style="padding: 20px">
          <div style="font-size: 30px; margin-bottom: 5px">Are you Ready?</div>
          <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">The host will advance to the pick phase when all players are in the correct slot.</div>
        </div>
      </div>
    </div>
    <div v-if="phaseDraft">
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
                <img @click="selectHero(hero)" :src="hero.image_portrait" class="button-hero" :style="getHeroImageStyle(hero)" />
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
                <img @click="selectHero(hero)" :src="hero.image_portrait" class="button-hero" :style="getHeroImageStyle(hero)" />
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
                <img @click="selectHero(hero)" :src="hero.image_portrait" class="button-hero" :style="getHeroImageStyle(hero)" />
              </template>
            </div>
          </div>
        </div>
        <div style="width: 20%; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 10px">
          <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between">
            <div style="display: flex; align-items: center; justify-content: center; width: 100%; margin-bottom: 5px">
              <div style="display: flex; justify-content: center; margin-right: 2px; width: 100%">{{ radiantClock }}</div>
              <div style="display: flex; justify-content: center; margin-right: 2px; width: 100%">
                <div style="display: flex; width: 100%">
                  <div style="display: flex; justify-content: flex-end; width: 50%">
                    <div style="text-transform: uppercase; color: #55c897">Radiant</div>
                    <img src="@/assets/arrow-radiant.svg" style="width: 16px; margin-left: 2px; margin-right: 2px" />
                  </div>
                  <div style="display: flex; justify-content: flex-start; width: 50%">
                    <img src="@/assets/arrow-dire.svg" style="width: 16px; margin-left: 2px; margin-right: 2px" />
                    <div style="text-transform: uppercase; color: #ca3535">Dire</div>
                  </div>
                </div>
              </div>
              <div style="display: flex; justify-content: center; margin-left: 2px; width: 100%">{{ direClock }}</div>
            </div>

            <div style="display: flex; flex-wrap: wrap">
              <template v-for="(item, index) in sequence" :key="index">
                <div style="border: 1px solid red; border-radius: 5px; min-width: 50%; min-height: 100px; padding: 5px">{{ item.stage }}</div>
              </template>
            </div>

            <div v-if="stageBan" style="display: flex">
              <div v-if="choice" @click="banHero" class="jnbrig" style="width: 100%">
                <div style="font-size: 0.8em">BAN</div>
                <div>{{ choice.name }}</div>
              </div>
              <div v-else class="jnbria" style="width: 100%">
                <div style="font-size: 0.8em">BAN</div>
              </div>
            </div>
            <div v-if="stagePick" style="display: flex">
              <div v-if="choice" @click="pickHero" class="jnbrig" style="width: 80%">
                <div style="font-size: 0.8em">LOCK IN</div>
                <div>{{ choice.name }}</div>
              </div>
              <div v-else class="jnbria" style="width: 80%">
                <div style="font-size: 0.8em">LOCK IN</div>
              </div>
            </div>
            <!--
            <div style="display: flex; width: 100%">
              <div style="display: flex; justify-content: flex-end; width: 50%; margin-right: 2px">
                <div>{{ radiantClock }}</div>
                <img src="@/assets/arrow-radiant.svg" style="width: 16px; margin-left: 2px; margin-right: 2px" />
              </div>
              <div style="display: flex; justify-content: flex-start; width: 50%; margin-left: 2px">
                <img src="@/assets/arrow-dire.svg" style="width: 16px; margin-left: 2px; margin-right: 2px" />
                <div>{{ direClock }}</div>
              </div>
            </div>
            -->
            <!--
            <div style="text-align: center">
              <h3 v-if="stageBan">CHOOSE YOUR BAN</h3>
              <h3 v-if="stagePick">CHOOSE YOUR PICK</h3>
              <div v-if="choice">
                <img :src="choice.image_profile" style="width: 100%" />
              </div>
              <div v-else class="bkcanr">
                <div class="cqfdfjkd" :style="{ '-webkit-mask': 'url(' + require('@/assets/profile.svg') + ')' }" />
              </div>
            </div>
            <div v-if="stageBan" style="display: flex">
              <div v-if="choice" @click="banHero" class="jnbrig" style="width: 100%">
                <div style="font-size: 0.8em">BAN</div>
                <div>{{ choice.name }}</div>
              </div>
              <div v-else class="jnbria" style="width: 100%">
                <div style="font-size: 0.8em">BAN</div>
              </div>
            </div>
            <div v-if="stagePick" style="display: flex">
              <div v-if="choice" @click="pickHero" class="jnbrig" style="width: 80%">
                <div style="font-size: 0.8em">LOCK IN</div>
                <div>{{ choice.name }}</div>
              </div>
              <div v-else class="jnbria" style="width: 80%">
                <div style="font-size: 0.8em">LOCK IN</div>
              </div>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/assets/heroes.json'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('cd/game')

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
      choice: null,
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
        this.clock = '##:##'
      }
    }, 1000)
  },
  components: {},
  computed: {
    ...mapGetters(['activePlayer', 'lastestTimestamp', 'radiantTimeUsage', 'direTimeUsage', 'phase', 'phaseReady', 'phaseDraft', 'phaseOver', 'stage', 'stageBan', 'stagePick', 'sequence']),
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
    picks() {
      return []
    },
    bans() {
      return []
    },
  },
  methods: {
    selectHero(hero) {
      if (this.bans.map((i) => i.hero?.id).includes(hero.id)) {
        return
      }
      if (this.picks.map((i) => i.hero?.id).includes(hero.id)) {
        return
      }

      this.choice = hero
    },
    banHero() {},
    pickHero() {},
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
.hero-roster {
  padding: 5px;
  margin: auto;
  width: 100%;
  border-radius: 10px;
}

.hero-ban {
  height: 20%;
}

.hero-pick {
  height: 50%;
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
