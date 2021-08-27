<template>
  <div style="background: #191919; margin-top: -5px">
    <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 0px; padding-bottom: 100px; display: flex">
      <div>
        <div class="herogridpage_FilterContainer_2dEVd">
          <div class="herogridpage_FilterLabel_1Mwn_">Filter Heroes</div>
          <div class="herogridpage_SpecificFilterContainer_30qnj">
            <div class="herogridpage_SelectorLabel_1Y7hg">Attribute</div>
            <div @click="filterAttribute('STRENGTH')" class="herogridpage_Filter_N74aa" v-bind:class="{ 'herogridpage_Selected_1os0-': attributeFilter == 'STRENGTH' }" :style="{ 'background-image': 'url(' + require('@/assets/filter-str-active.png') + ')' }"></div>
            <div @click="filterAttribute('AGILITY')" class="herogridpage_Filter_N74aa" v-bind:class="{ 'herogridpage_Selected_1os0-': attributeFilter == 'AGILITY' }" :style="{ 'background-image': 'url(' + require('@/assets/filter-agi-active.png') + ')' }"></div>
            <div @click="filterAttribute('INTELLECT')" class="herogridpage_Filter_N74aa" v-bind:class="{ 'herogridpage_Selected_1os0-': attributeFilter == 'INTELLECT' }" :style="{ 'background-image': 'url(' + require('@/assets/filter-int-active.png') + ')' }"></div>
          </div>
          <div class="herogridpage_SpecificFilterContainer_30qnj">
            <div class="herogridpage_SelectorLabel_1Y7hg">Complexity</div>
            <Complexity v-model:complexity="complexityFilter"></Complexity>
          </div>
          <div class="herogridpage_SearchBarContainer_2P5Fc">
            <div class="herogridpage_SearchBar_2paN1">
              <div class="herogridpage_MagnifyingGlass_3TNwr">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.24899 0C12.8031 0 16.498 3.69531 16.498 8.25C16.498 9.88281 16.0361 11.3867 15.2198 12.6543L21.4603 18.8633C22.1799 19.583 22.1799 20.7539 21.4603 21.4629C21.1058 21.8174 20.644 22 20.1606 22C19.7095 22 19.2262 21.8174 18.861 21.4629L12.6528 15.2217C11.3853 16.0381 9.88161 16.5 8.24899 16.5C3.69486 16.5 0 12.8047 0 8.25C0 3.69531 3.69486 0 8.24899 0ZM8.24899 13.75C11.2779 13.75 13.7483 11.2793 13.7483 8.25C13.7483 5.2207 11.2779 2.75 8.24899 2.75C5.22007 2.75 2.74966 5.2207 2.74966 8.25C2.74966 11.2793 5.22007 13.75 8.24899 13.75Z"
                    fill="#505050"
                  />
                </svg>
              </div>
              <form v-on:submit.prevent><input type="text" v-model="nameFilter" /></form>
            </div>
          </div>
        </div>
        <div class="herogridpage_HeroGrid_D36V-">
          <div class="herogridpage_GridList_3LrTP">
            <template v-for="(item, index) in heroes" :key="item.id">
              <div class="herogridpage_HeroIcon_7szOn" :style="getHeroGridStyle(index)" @click="select(item)">
                <img :src="item.image_banner" style="width: 110px; height: 64px" :style="getHeroImageStyle(item)" />
                <div class="herogridpage_HeroNameContainer_3ldbS">
                  <img v-if="item.primary_attribute == 'STRENGTH'" src="https://hyperstone.highgroundvision.com/images/attributes/strength.png" class="herogridpage_PrimaryStatIcon_12etd" />
                  <img v-if="item.primary_attribute == 'AGILITY'" src="https://hyperstone.highgroundvision.com/images/attributes/agility.png" class="herogridpage_PrimaryStatIcon_12etd" />
                  <img v-if="item.primary_attribute == 'INTELLECT'" src="https://hyperstone.highgroundvision.com/images/attributes/intelligence.png" class="herogridpage_PrimaryStatIcon_12etd" />
                  <div class="herogridpage_HeroName_3N-bh">{{ item.name }}</div>
                </div>
                <div class="herogridpage_FadeContainer_Abboq">
                  <div class="fade_FadeContainer_1JDI3 fade_Bottom_1NXAh"><div class="fade_Fade_1keus" style="background: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.733) 75%, rgb(0, 0, 0) 100%)"></div></div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Complexity from '@/components/Complexity.vue'

const { mapState, mapActions } = createNamespacedHelpers('hc') //

export default {
  data() {
    return {
      nameFilter: '',
      attributeFilter: '',
      complexityFilter: 0,
    }
  },
  components: {
    Complexity,
  },
  computed: {
    ...mapState({
      db: (state) => state.heroes,
      selection: (state) => state.selection,
    }),
    heroes: function () {
      let heroes = this.db
      let f1 = this.nameFilter
      let f2 = this.attributeFilter
      let f3 = this.complexityFilter
      if (f1) {
        f1 = f1.toLowerCase()
        heroes = heroes.filter((_) => _.name.toLowerCase().includes(f1) || _.aliases.includes(f1))
      }
      if (f2) {
        heroes = heroes.filter((_) => _.primary_attribute == f2)
      }
      if (f3) {
        heroes = heroes.filter((_) => _.complexity == f3)
      }
      return heroes
    },
  },
  methods: {
    getHeroGridStyle(index) {
      var x = index % 10
      var y = index / 10
      var col = x * 128 - 120
      var row = Math.floor(y) * 75
      return `left: ${col}px; top: ${row}px;`
    },
    getHeroImageStyle(item) {
      let result = this.selection.filter((i) => i).some((i) => i.id == item.id)
      return result ? 'filter: brightness(50%)' : ''
    },
    filterAttribute(attribute) {
      if (this.attributeFilter == attribute) {
        this.attributeFilter = null
      } else {
        this.attributeFilter = attribute
      }
    },
    filterComplexity(complexity) {
      if (this.complexityFilter == complexity) {
        this.complexityFilter = null
      } else {
        this.complexityFilter = complexity
      }
    },
    ...mapActions(['select']),
  },
}
</script>

<style scoped>
/*!sc*/
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

.herogridpage_FilterContainer_2dEVd .herogridpage_SpecificFilterContainer_30qnj .herogridpage_Filter_N74aa.herogridpage_Selected_1os0- {
  filter: brightness(1) saturate(1);
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

.herogridpage_FilterContainer_2dEVd .herogridpage_SpecificFilterContainer_30qnj {
  width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
}

.herogridpage_FilterContainer_2dEVd .herogridpage_SpecificFilterContainer_30qnj .herogridpage_SelectorLabel_1Y7hg {
  color: #808fa6;
  font-size: 17px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 20px;
}

.herogridpage_FilterContainer_2dEVd .herogridpage_SpecificFilterContainer_30qnj .herogridpage_Filter_N74aa {
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
.herogridpage_FilterContainer_2dEVd .herogridpage_SearchBarContainer_2P5Fc {
  width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: right;
}

.herogridpage_FilterContainer_2dEVd .herogridpage_SearchBarContainer_2P5Fc .herogridpage_SearchBar_2paN1 {
  width: 250px;
  height: 50px;
  background-color: #25282a;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.herogridpage_FilterContainer_2dEVd .herogridpage_SearchBarContainer_2P5Fc .herogridpage_SearchBar_2paN1 .herogridpage_MagnifyingGlass_3TNwr {
  width: 26px;
  height: 26px;
  min-width: 26px;
  min-height: 26px;
  margin-right: 10px;
  margin-left: 10px;
  background-size: cover;
  background-repeat: no-repeat;
}

.herogridpage_FilterContainer_2dEVd .herogridpage_SearchBarContainer_2P5Fc .herogridpage_SearchBar_2paN1 form {
  flex-grow: 1;
  margin-right: 10px;
}

.herogridpage_FilterContainer_2dEVd .herogridpage_SearchBarContainer_2P5Fc .herogridpage_SearchBar_2paN1 form input {
  height: 30px;
  width: 100%;
  border: 0px solid transparent;
  background-color: #25282a;
  outline: none;
  color: #fff;
  font-size: 18px;
  padding: 4px;
}

.herogridpage_HeroIcon_7szOn:hover {
  transform: scale(1.4);
  box-shadow: 3px 3px 8px #000;
  background-size: 100%;
  filter: saturate(1);
  z-index: 4;
}

.herogridpage_HeroIcon_7szOn:hover .herogridpage_FadeContainer_Abboq {
  opacity: 1;
}

.herogridpage_HeroIcon_7szOn:hover .herogridpage_HeroNameContainer_3ldbS {
  opacity: 1;
  bottom: 0px;
}

.herogridpage_HeroGrid_D36V- {
  width: 100%;
  padding: 0px 100px 0px 100px;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
  position: relative;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8em;
}

.herogridpage_HeroIcon_7szOn {
  width: 110px;
  height: 64px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 4px #000;
  filter: saturate(0.8);
  transition-property: transform, box-shadow, background-size, opacity, top, left;
  transition-timing-function: ease-out;
  transition-duration: 0.3s;
  background-position: center;
  background-size: 110%;
  background-repeat: no-repeat;
  position: absolute;
  overflow: hidden;
  cursor: pointer;
}

.herogridpage_GridList_3LrTP {
  width: 1200px;
  min-height: 1000px;
  margin-top: 15px;
  transition-property: height;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0.1s;
  animation-iteration-count: 1;
  animation-name: herogridpage_gridIn_NeQOP;
  position: relative;
}

.herogridpage_HeroIcon_7szOn .herogridpage_HeroNameContainer_3ldbS {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: -40px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition-property: opacity, bottom;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  z-index: 3;
  opacity: 0;
}

.herogridpage_HeroIcon_7szOn .herogridpage_FadeContainer_Abboq {
  width: 100%;
  height: 100%;
  position: absolute;
  transition-property: opacity, bottom;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  opacity: 0;
}

.herogridpage_HeroIcon_7szOn .herogridpage_HeroNameContainer_3ldbS .herogridpage_PrimaryStatIcon_12etd {
  width: 32px;
  height: 32px;
  padding: 8px;
  filter: drop-shadow(0px 0px 4px black);
}
.fade_FadeContainer_1JDI3.fade_Bottom_1NXAh {
  left: 0px;
  bottom: 0px;
  right: 0px;
}
.fade_FadeContainer_1JDI3 {
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
}
</style>
