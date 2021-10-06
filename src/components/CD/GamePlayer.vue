<template>
  <div style="padding: 10px 30px 30px 30px; background: #191919">
    <div v-if="phaseReady">
      <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 50px; display: flex; align-items: center">
        <div style="padding: 20px">
          <div style="font-size: 30px; margin-bottom: 5px">Are you Ready?</div>
          <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">The host will advance to the draft phase both Captains are ready.</div>
        </div>
      </div>
    </div>
    <div v-if="phaseDraft">
      <div style="display: flex">
        <div style="width: 80%">
          <div style="display: flex; padding: 5px; margin: 5px">
            <div style="writing-mode: vertical-lr; text-orientation: mixed">
              <div style="text-align: center; transform: scale(-1, -1)">STRENGTH</div>
              <hr class="str-border" />
            </div>
            <div>
              <template v-for="hero in strHeroes" :key="hero.id">
                <img :src="hero.image_portrait" class="button-hero" :class="getHeroImageClass(hero)" @click="selectHero(hero)" />
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
                <img :src="hero.image_portrait" class="button-hero" :class="getHeroImageClass(hero)" @click="selectHero(hero)" />
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
                <img :src="hero.image_portrait" class="button-hero" :class="getHeroImageClass(hero)" @click="selectHero(hero)" />
              </template>
            </div>
          </div>
        </div>
        <div style="width: 20%; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 10px">
          <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between">
            <div style="display: flex; align-items: center; justify-content: center; width: 100%; margin-bottom: 10px">
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

            <div style="display: flex">
              <div style="display: flex; flex-direction: column; width: 50%">
                <template v-for="item in sequence.filter((i) => i.team == '1')" :key="item.id">
                  <div v-if="item.stage == 'ban'" style="height: 50px; padding: 5px; width: 100%; display: flex; justify-content: flex-end">
                    <img v-if="item.choice" :src="item.hero.image_banner" style="height: 100%; border: 2px solid #ca3535; border-radius: 5px 0px 0px 5px" />
                    <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" style="height: 100%; border: 2px solid #ca3535; border-radius: 5px 0px 0px 5px" />
                    <div style="width: 18px; height: 100%; display: flex; justify-content: center; background-color: #ca3535; border-radius: 0px 5px 5px 0px" :style="{ 'align-items': item.id % 2 == 0 ? 'flex-end' : 'flex-start' }">
                      {{ item.id }}
                    </div>
                  </div>
                  <div v-else-if="item.stage == 'pick'" style="height: 80px; padding: 5px; width: 100%; display: flex; justify-content: flex-end">
                    <img v-if="item.choice" :src="item.hero.image_banner" style="height: 100%; border: 2px solid #55c897; border-radius: 5px 0px 0px 5px" />
                    <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" style="height: 100%; border: 2px solid #55c897; border-radius: 5px 0px 0px 5px" />
                    <div style="width: 18px; height: 100%; display: flex; justify-content: center; background-color: #55c897; border-radius: 0px 5px 5px 0px" :style="{ 'align-items': item.id % 2 == 0 ? 'flex-end' : 'flex-start' }">
                      {{ item.id }}
                    </div>
                  </div>
                  <div v-else-if="item.stage == 'extra'" style="height: 50px; padding: 5px; width: 100%; display: flex; justify-content: flex-end">
                    <img v-if="item.choice" :src="item.hero.image_banner" style="height: 100%; border: 2px solid #3498db; border-radius: 5px 0px 0px 5px" />
                    <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" style="height: 100%; border: 2px solid #3498db; border-radius: 5px 0px 0px 5px" />
                    <div style="width: 18px; height: 100%; display: flex; justify-content: center; background-color: #3498db; border-radius: 0px 5px 5px 0px" :style="{ 'align-items': item.id % 2 == 0 ? 'flex-end' : 'flex-start' }">
                      {{ item.id }}
                    </div>
                  </div>
                </template>
              </div>
              <div style="display: flex; flex-direction: column; width: 50%">
                <template v-for="item in sequence.filter((i) => i.team == '2')" :key="item.id">
                  <div v-if="item.stage == 'ban'" style="height: 50px; padding: 5px; width: 100%; display: flex; justify-content: flex-start">
                    <div style="width: 18px; height: 100%; display: flex; justify-content: center; background-color: #ca3535; border-radius: 5px 0px 0px 5px" :style="{ 'align-items': item.id % 2 == 0 ? 'flex-end' : 'flex-start' }">
                      {{ item.id }}
                    </div>
                    <img v-if="item.choice" :src="item.hero.image_banner" style="height: 100%; border: 2px solid #ca3535; border-radius: 0px 5px 5px 0px" />
                    <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" style="height: 100%; border: 2px solid #ca3535; border-radius: 0px 5px 5px 0px" />
                  </div>
                  <div v-else-if="item.stage == 'pick'" style="height: 80px; padding: 5px; width: 100%; display: flex; justify-content: flex-start">
                    <div style="width: 18px; height: 100%; display: flex; justify-content: center; background-color: #55c897; border-radius: 5px 0px 0px 5px" :style="{ 'align-items': item.id % 2 == 0 ? 'flex-end' : 'flex-start' }">
                      {{ item.id }}
                    </div>
                    <img v-if="item.choice" :src="item.hero.image_banner" style="height: 100%; border: 2px solid #55c897; border-radius: 0px 5px 5px 0px" />
                    <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" style="height: 100%; border: 2px solid #55c897; border-radius: 0px 5px 5px 0px" />
                  </div>
                  <div v-else-if="item.stage == 'extra'" style="height: 50px; padding: 5px; width: 100%; display: flex; justify-content: flex-start">
                    <div style="width: 18px; height: 100%; display: flex; justify-content: center; background-color: #3498db; border-radius: 5px 0px 0px 5px" :style="{ 'align-items': item.id % 2 == 0 ? 'flex-end' : 'flex-start' }">
                      {{ item.id }}
                    </div>
                    <img v-if="item.choice" :src="item.hero.image_banner" style="height: 100%; border: 2px solid #3498db; border-radius: 0px 5px 5px 0px" />
                    <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/banner/0.jpg" style="height: 100%; border: 2px solid #3498db; border-radius: 0px 5px 5px 0px" />
                  </div>
                </template>
              </div>
            </div>

            <div v-if="stageBan" style="display: flex; margin-top: 10px">
              <div v-if="choice" class="jnbrig" style="width: 100%" @click="confrimSelection">
                <div style="font-size: 0.8em">BAN</div>
                <div>{{ choice.name }}</div>
              </div>
              <div v-else class="jnbria" style="width: 100%">
                <div style="font-size: 0.8em">BAN</div>
              </div>
            </div>
            <div v-if="stagePick || stageExtra" style="display: flex">
              <div v-if="choice" class="jnbrig" style="width: 100%" @click="confrimSelection">
                <div style="font-size: 0.8em">LOCK IN</div>
                <div>{{ choice.name }}</div>
              </div>
              <div v-else class="jnbria" style="width: 100%">
                <div style="font-size: 0.8em">LOCK IN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="phaseOrder">
      <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 10px 100px 10px">
        <div class="herogridpage_FilterContainer_2dEVd">
          <div class="herogridpage_FilterLabel_1Mwn_ small">Reorder Your Selection</div>
          <div style="display: flex; align-items: center; justify-content: flex-end">
            <div v-if="!isDone" class="kvjfk" data-tooltip="up" aria-label="Lets the host know your done." @click="doneOrdering">
              <img src="@/assets/ready.svg" />
            </div>
          </div>
        </div>
        <div>
          <draggable v-model="roster" item-key="id" group="roster" style="display: flex; border-radius: 5px 5px 5px 5px">
            <template #item="{ element }">
              <div style="width: 100%; padding: 5px">
                <img :src="element.hero.image_banner" style="width: 100%; border-radius: 5px" />
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
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
          <template v-for="(item, index) in sequence.filter((i) => i.team == 1 && i.stage == 'pick')" :key="index">
            <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div class="cut-text">{{ 'Slot ' + (index + 1) }}</div>
              </div>
              <img :src="item.hero.image_portrait" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div style="font-size: 0.8em"></div>
              </div>
            </div>
          </template>
          <template v-for="(item, index) in sequence.filter((i) => i.team == 1 && i.stage == 'extra')" :key="index">
            <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div class="cut-text">Extra</div>
              </div>
              <img :src="item.hero.image_portrait" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div style="font-size: 0.8em"></div>
              </div>
            </div>
          </template>
        </div>
        <hr />
        <div style="display: flex; flex-wrap: wrap">
          <div style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #000; border-radius: 5px" class="cqvqpa">
            <div style="text-align: center; width: 100%; min-height: 20px; background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))">
              <div style="width: 100%">Dire</div>
            </div>
            <img src="https://hyperstone.highgroundvision.com/images/towers/dire/full.png" style="width: 100%; padding: 5px; margin: auto" />
          </div>
          <template v-for="(item, index) in sequence.filter((i) => i.team == 2 && i.stage == 'pick')" :key="index">
            <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div class="cut-text">{{ 'Slot ' + (index + 1) }}</div>
              </div>
              <img :src="item.hero.image_portrait" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div style="font-size: 0.8em"></div>
              </div>
            </div>
          </template>
          <template v-for="(item, index) in sequence.filter((i) => i.team == 2 && i.stage == 'extra')" :key="index">
            <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px">
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div class="cut-text">Extra</div>
              </div>
              <img :src="item.hero.image_portrait" class="hero-roster" />
              <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
                <div style="font-size: 0.8em"></div>
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
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('cd/game')

import draggable from 'vuedraggable'
import db from '@/assets/heroes.json'

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
  components: {
    draggable,
  },
  data() {
    return {
      interval: null,
      radiantClock: '##:##',
      direClock: '##:##',
      choice: null,
    }
  },
  computed: {
    ...mapState(['isActive']),
    ...mapGetters(['activePlayer', 'playerID', 'lastestTimestamp', 'radiantTimeUsage', 'direTimeUsage', 'phase', 'phaseReady', 'phaseDraft', 'phaseOrder', 'phaseOver', 'stage', 'stageBan', 'stagePick', 'stageExtra', 'isDone', 'sequence', 'replacement']),
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
    roster: {
      get() {
        return this.sequence.filter((i) => i.team == this.playerID && i.stage == 'pick')
      },
      set(value) {
        let roster = value.map((i) => i.choice)
        this.updateOrder(roster)
      },
    },
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
  methods: {
    ...mapActions(['makeChoice', 'updateOrder', 'doneOrdering']),
    selectHero(hero) {
      if (!this.isActive) {
        return
      }
      if (hero.ability_replace_required && this.replacement) {
        return
      }
      if (this.sequence.map((i) => i.hero?.id).includes(hero.id)) {
        return
      }

      this.choice = hero
    },
    confrimSelection() {
      if (this.choice) {
        this.makeChoice(this.choice)
        this.choice = null
      }
    },
    getHeroImageClass(hero) {
      if (hero.ability_replace_required && this.replacement) {
        return 'button-hero-baned '
      }
      if (this.sequence.map((i) => i.hero?.id).includes(hero.id)) {
        return 'button-hero-baned '
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
  width: 75px;
  padding: 3px;
  border-radius: 5px;
  cursor: pointer;
}
.button-hero:hover {
  border: 2px solid white;
}

.button-hero-baned {
  -webkit-filter: invert(40%) grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2);
  filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8);
  border: 2px solid red;
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

.kvjfk {
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

.kvjfk:hover {
  background: #6161ab;
  border: 2px solid #00000040 !important;
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
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
