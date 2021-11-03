<template>
  <div v-if="phaseOver">
    <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 20px; max-width: 800px; width: 100%; margin: auto; margin-top: 5px; margin-bottom: 20px; display: flex; align-items: center">
      <div style="padding: 20px">
        <div style="font-size: 30px; margin-bottom: 5px">Draft Complete</div>
        <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">The phase of the draft is over wait for the host to enter the console commands and start the Dota match.</div>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; padding-top: 20px">
      <div style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #000; border-radius: 5px" class="cqvqpi">
        <div style="text-align: center; width: 100%; min-height: 20px; background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))">
          <div style="width: 100%">Radiant</div>
        </div>
        <img src="https://hyperstone.highgroundvision.com/images/towers/radiant/full.png" style="width: 100%; padding: 5px; margin: auto" />
      </div>
      <template v-for="(item, index) in slots.slice(0, 5)" :key="index">
        <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
            <div class="cut-text">{{ item.name ?? 'Slot ' + (index + 1) }}</div>
          </div>
          <img v-if="item.selection" :src="item.selection.image_portrait" class="hero-roster" />
          <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg" class="hero-roster" />
          <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
            <div style="font-size: 0.8em"></div>
          </div>
        </div>
      </template>
      <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
        <div style="text-align: center; width: 100%; min-height: 20px; background-color: #616a6b">
          <div style="width: 100%">Extra</div>
        </div>
        <div v-if="extrasFlag == 1" class="bkcanr">
          <div class="cqfdfjkd" :style="{ '-webkit-mask': 'url(' + require('@/assets/random.svg') + ')', mask: 'url(' + require('@/assets/random.svg') + ')' }" />
        </div>
        <img v-else-if="extrasFlag == 2 || extrasFlag == 3" :src="extraRadiantImage" class="hero-roster" />
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
      <template v-for="(item, index) in slots.slice(5, 10)" :key="index">
        <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
            <div class="cut-text">{{ item.name ?? 'Slot ' + (index + 1) }}</div>
          </div>
          <img v-if="item.selection" :src="item.selection.image_portrait" class="hero-roster" />
          <img v-else src="https://hyperstone.highgroundvision.com/images/heroes/portrait/0.jpg" class="hero-roster" />
          <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
            <div style="font-size: 0.8em"></div>
          </div>
        </div>
      </template>
      <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
        <div style="text-align: center; width: 100%; min-height: 20px; background-color: #616a6b">
          <div style="width: 100%">Extra</div>
        </div>
        <div v-if="extrasFlag == 1" class="bkcanr">
          <div class="cqfdfjkd" :style="{ '-webkit-mask': 'url(' + require('@/assets/random.svg') + ')', mask: 'url(' + require('@/assets/random.svg') + ')' }" />
        </div>
        <img v-else-if="extrasFlag == 2 || extrasFlag == 3" :src="extraDireImage" class="hero-roster" />
        <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
          <div style="font-size: 0.8em; padding-top: 2px"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="phaseReady" style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 50px; display: flex; align-items: center">
    <div style="padding: 20px">
      <div style="font-size: 30px; margin-bottom: 5px">Are you Ready?</div>
      <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">The host will advance to the pick phase when all players are in the correct slot.</div>
    </div>
  </div>
  <div v-if="phasePick || phaseExtra" style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 50px; display: flex; align-items: center">
    <div style="padding: 20px">
      <div style="font-size: 30px; margin-bottom: 5px">Pick Hero</div>
      <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">Select a hero from a Strength, Agility, Intelligence option.</div>
      <div style="display: flex; padding: 10px">
        <template v-for="(item, index) in options" :key="index">
          <div v-if="selection" style="text-align: center">
            <img :src="item.image_profile" class="hero-selection" :class="getSelectedStyle(item, selection)" />
            <div>{{ item.name }}</div>
          </div>
          <div v-else style="text-align: center">
            <img class="hero-selection" :src="item.image_profile" :class="getHeroImageStyle(item)" @click="pick(index)" />
            <div>{{ item.name }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div v-if="phaseExtra && extrasFlag == 3" style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 50px; display: flex; align-items: center">
    <div style="padding: 20px">
      <div style="font-size: 30px; margin-bottom: 5px">Vote for Extra</div>
      <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">Cast your vote for the Extra hero from a Strength, Agility, Intelligence option.</div>
      <div v-if="playerID < 6" style="display: flex; padding: 10px">
        <template v-for="(item, index) in slots.slice(10, 11)" :key="index">
          <template v-for="(hero, i) in item.options" :key="hero.id">
            <div v-if="isActive" style="text-align: center">
              <img class="hero-selection" :src="hero.image_profile" :class="getHeroImageStyle(hero)" @click="extraVote(i)" />
              <span>{{ hero.name }}</span>
              <span style="margin: 2px; padding: 5px; border-radius: 5px; width: 20px; z-index: 9" class="cqvqpa">{{ hero.votes }}</span>
            </div>
            <div v-else style="text-align: center">
              <img :src="hero.image_profile" class="hero-selection" :class="getSelectedStyle(hero, item.selection)" />
              <span>{{ hero.name }}</span>
              <span style="margin-left: 10px; padding: 5px; border-radius: 5px; width: 20px; z-index: 9" class="cqvqpa">{{ hero.votes }}</span>
            </div>
          </template>
        </template>
      </div>
      <div v-else style="display: flex; padding: 10px">
        <template v-for="(item, index) in slots.slice(11)" :key="index">
          <template v-for="(hero, i) in item.options" :key="hero.id">
            <div v-if="isActive" style="text-align: center">
              <img class="hero-selection" :src="hero.image_profile" :class="getHeroImageStyle(hero)" @click="extraVote(i)" />
              <div>{{ item.name }}</div>
            </div>
            <div v-else style="text-align: center">
              <img :src="hero.image_profile" class="hero-selection" :class="getSelectedStyle(hero, item.selection)" />
              <div>{{ item.name }}</div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
  <div v-if="phasePick || phaseExtra">
    <div v-if="(visibilityFlag == 2 && playerID < 6) || visibilityFlag == 3">
      <div style="display: flex; flex-wrap: wrap; padding-top: 20px">
        <div style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #000; border-radius: 5px" class="cqvqpi">
          <div style="text-align: center; width: 100%; min-height: 20px; background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))">
            <div style="width: 100%">Radiant</div>
          </div>
          <img src="https://hyperstone.highgroundvision.com/images/towers/radiant/full.png" style="width: 100%; padding: 5px; margin: auto" />
        </div>
        <template v-for="(item, index) in slots.slice(0, 5)" :key="index">
          <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px">
            <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
              <div class="cut-text">{{ item.name ?? 'Slot ' + (index + 1) }}</div>
            </div>
            <template v-for="hero in item.options" :key="hero.id">
              <img v-if="item.selection && playerID < 6" :src="hero.image_banner" class="hero-roster" :class="getSelectedStyle(hero, item.selection)" />
              <img v-else :src="hero.image_banner" class="hero-roster" />
            </template>
            <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
              <div v-if="item.isConnected" style="font-size: 0.8em">Connected</div>
              <div v-else style="font-size: 0.8em">Disconnected</div>
            </div>
          </div>
        </template>
        <div v-if="extrasFlag == 1" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background-color: #616a6b">
            <div style="width: 100%">Extra</div>
          </div>
          <div class="bkcanr">
            <div class="cqfdfjkd" :style="{ '-webkit-mask': 'url(' + require('@/assets/random.svg') + ')', mask: 'url(' + require('@/assets/random.svg') + ')' }" />
          </div>
          <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
            <div style="font-size: 0.8em; padding-top: 2px">Random</div>
          </div>
        </div>
        <div v-if="extrasFlag == 2" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background-color: #616a6b">
            <div style="width: 100%">Extra</div>
          </div>
          <img :src="extraRadiantImage" class="hero-roster" />
          <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
            <div style="font-size: 0.8em; padding-top: 2px">Host Choice</div>
          </div>
        </div>
        <div v-if="extrasFlag == 3" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background-color: #616a6b">
            <div style="width: 100%">Extra</div>
          </div>
          <template v-for="(item, index) in slots.slice(10, 11)" :key="index">
            <template v-for="hero in item.options" :key="hero.id">
              <div style="position: relative">
                <span style="position: absolute; right: 0px; bottom: 0px; margin: 2px; padding: 5px; border-radius: 5px; width: 20px; z-index: 9" class="cqvqpa">{{ hero.votes }}</span>
                <img v-if="item.selection && playerID < 6" :src="hero.image_banner" class="hero-roster" :class="getSelectedStyle(hero, item.selection)" />
                <img v-else :src="hero.image_banner" class="hero-roster" />
              </div>
            </template>
          </template>
          <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
            <div style="font-size: 0.8em; padding-top: 2px">Players Vote</div>
          </div>
        </div>
      </div>
    </div>
    <hr v-if="visibilityFlag == 3" />
    <div v-if="(visibilityFlag == 2 && playerID > 5) || visibilityFlag == 3">
      <div style="display: flex; flex-wrap: wrap">
        <div style="flex: 1 0 6%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #000; border-radius: 5px" class="cqvqpa">
          <div style="text-align: center; width: 100%; min-height: 20px; background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))">
            <div style="width: 100%">Dire</div>
          </div>
          <img src="https://hyperstone.highgroundvision.com/images/towers/dire/full.png" style="width: 100%; padding: 5px; margin: auto" />
        </div>
        <template v-for="(item, index) in slots.slice(5, 10)" :key="index">
          <div style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; margin: 5px; border: 1px solid #616a6b; border-radius: 5px">
            <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
              <div class="cut-text">{{ item.name ?? 'Slot ' + (index + 1) }}</div>
            </div>
            <template v-for="hero in item.options" :key="hero.id">
              <img v-if="item.selection && playerID > 5" :src="hero.image_banner" class="hero-roster" :class="getSelectedStyle(hero, item.selection)" />
              <img v-else :src="hero.image_banner" class="hero-roster" />
            </template>
            <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
              <div v-if="item.isConnected" style="font-size: 0.8em">Connected</div>
              <div v-else style="font-size: 0.8em">Disconnected</div>
            </div>
          </div>
        </template>
        <div v-if="extrasFlag == 1" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background-color: #616a6b">
            <div style="width: 100%">Extra</div>
          </div>
          <div class="bkcanr">
            <div class="cqfdfjkd" :style="{ '-webkit-mask': 'url(' + require('@/assets/random.svg') + ')', mask: 'url(' + require('@/assets/random.svg') + ')' }" />
          </div>
          <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
            <div style="font-size: 0.8em; padding-top: 2px">Random</div>
          </div>
        </div>
        <div v-if="extrasFlag == 2" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background-color: #616a6b">
            <div style="width: 100%">Extra</div>
          </div>
          <img :src="extraDireImage" class="hero-roster" />
          <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
            <div style="font-size: 0.8em; padding-top: 2px">Host Choice</div>
          </div>
        </div>
        <div v-if="extrasFlag == 3" style="flex: 1 0 12%; display: flex; flex-direction: column; align-items: flex-start; text-align: center; margin: 5px; border: 2px solid #616a6b; border-radius: 5px">
          <div style="text-align: center; width: 100%; min-height: 20px; background-color: #616a6b">
            <div style="width: 100%">Extra</div>
          </div>
          <template v-for="(item, index) in slots.slice(11)" :key="index">
            <template v-for="hero in item.options" :key="hero.id">
              <div style="position: relative">
                <span style="position: absolute; right: 0px; bottom: 0px; margin: 2px; padding: 5px; border-radius: 5px; width: 20px; z-index: 9" class="cqvqpa">{{ hero.votes }}</span>
                <img v-if="item.selection && playerID > 5" :src="hero.image_banner" class="hero-roster" :class="getSelectedStyle(hero, item.selection)" />
                <img v-else :src="hero.image_banner" class="hero-roster" />
              </div>
            </template>
          </template>
          <div style="text-align: center; width: 100%; min-height: 20px; background: #616a6b">
            <div style="font-size: 0.8em; padding-top: 2px">Players Vote</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('sd/game')

export default {
  setup() {},
  computed: {
    ...mapState(['isActive']),
    ...mapGetters(['playerID', 'visibilityFlag', 'extrasFlag', 'slots', 'options', 'selection', 'phase', 'phaseReady', 'phasePick', 'phaseExtra', 'phaseOver']),
    extraRadiantImage() {
      return this.$store.state.sd.game.G.collection[10]?.selection?.image_banner
    },
    extraDireImage() {
      return this.$store.state.sd.game.G.collection[11]?.selection?.image_banner
    },
  },
  methods: {
    ...mapActions(['pick']),
    getHeroImageStyle(item) {
      return {
        'hero-str': item.primary_attribute == 'STRENGTH',
        'hero-agi': item.primary_attribute == 'AGILITY',
        'hero-int': item.primary_attribute == 'INTELLECT',
      }
    },
    getSelectedStyle(item, selected) {
      return {
        selected: item?.id == selected?.id,
        'not-selected': item?.id != selected?.id,
      }
    },
    extraVote(index) {
      this.$store.dispatch('sd/game/voteExtra', index)
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
}

.cqfdfjka {
  width: 128px;
  height: 128px;
  background: linear-gradient(-45deg, #591f82, #ffa233, #9734de, #d35400);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
}

.bkcanr {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center; /* vertical */
  justify-content: center; /* horizontal */
}
</style>
