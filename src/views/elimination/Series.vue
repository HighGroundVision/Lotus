<template>
  <div class="elimination-draft">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="card" >
            <div class="card-body" >
              <h1>Elimination</h1>
              <p class="card-text">
                Each team's captain bans and chooses heroes for the team's roster. Once a hero is picked they are eliminated from future pools.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row" v-if="data">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
              <h5>Hero Draft Options</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_pick_time" v-model="data.options.switch_pick_time">
                    <label class="custom-control-label" for="switch_pick_time">Override total time (in seconds) for Picks.</label>
                  </div>
                </div>
                <div class="col-xl-6">
                  <single-slider v-model="data.options.pick_time" :min="1" :max="60"></single-slider>
                </div>
              </div>

              <div class="row">
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_pick_time" v-model="data.options.switch_pick_time">
                    <label class="custom-control-label" for="switch_pick_time">Override total time (in seconds) for Picks.</label>
                  </div>
                </div>
                <div class="col-xl-6">
                  <single-slider v-model="data.options.pick_time" :min="1" :max="60"></single-slider>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_ban_eliminated" v-model="data.options.switch_ban_eliminated">
                    <label class="custom-control-label" for="switch_ban_eliminated">Bans eliminate Heroes from the pool.</label>
                  </div>
                </div>
              </div>

              <div class="row" >
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_extra_time" v-model="data.options.switch_extra_time">
                    <label class="custom-control-label" for="switch_extra_time">Override total time (in seconds) for Extras.</label>
                  </div>
                </div>
                <div class="col-xl-6">
                  <single-slider v-model="data.options.extra_time" :min="1" :max="60"></single-slider>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_extra_eliminated" v-model="data.options.switch_extra_eliminated">
                    <label class="custom-control-label" for="switch_extra_eliminated">Extras eliminate Heroes from the pool.</label>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row" v-if="data">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
              <h5>Hero Draft Format</h5>
            </div>
            <div class="card-body">
              <p>
                The draft format controls which captain (Radiant/Dire) preforms which action at each phase from banning, picking, and extra. 
                You can drag and drop to reorder the steps.
              </p>
              <div class="row">
                <draggable v-model="data.format" tag="transition-group" item-key="id" ghost-class="ghost">
                  <template #item="{element, index}">
                    <div class="card m-1 " style="width: 9rem;">
                      <div class="card-header p-1 text-center">
                        <button title="Dire" type="button" class="btn m-1 btn-sm d-inline" v-bind:class="{'btn-secondary': !element.selected, 'btn-warning': element.selected }" @click="toggleSelection(element)">
                          {{(index+1).toString().padStart(2, '0')}}
                        </button>
                        <button title="Dire" type="button" class="btn m-1 btn-sm d-inline" style="background-color: #825230;" v-if="element.side==0" @click="toggleSide(element)">
                          <img src="@/assets/dire.png" style="width:16px;height:16px;" />
                        </button>
                        <button title="Radiant" type="button" class="btn m-1 btn-sm d-inline" style="background-color: #2c7ea8;" v-if="element.side==1" @click="toggleSide(element)">
                          <img src="@/assets/radiant.png" style="width:16px;height:16px;" />
                        </button>
                        <button title="Ban Phase" type="button" class="btn m-1 btn-danger btn-sm d-inline" v-if="element.type==1" @click="togglePhase(element)">
                          <i class="fas fa-ban"></i>
                        </button>
                        <button title="Pick Phase" type="button" class="btn m-1 btn-success btn-sm d-inline" v-if="element.type==2" @click="togglePhase(element)">
                          <i class="fas fa-check"></i>
                        </button>
                        <button title="Extra Phase" type="button" class="btn m-1 btn-info btn-sm d-inline" v-if="element.type==3" @click="togglePhase(element)">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </template>
                </draggable>
              </div>
              <br />
              <div class="row">
                <div class="col-xl-12">
                  <div class="alert alert-warning" role="alert" v-if="notEnoughPicks">
                    If you do not have enough pick phases the rest of the picks will be random.
                  </div>
                  <div class="alert alert-danger" role="alert" v-if="toManyPicks">
                    To many Pick phases.
                  </div>
                  <div class="alert alert-danger" role="alert" v-if="toManyExtra">
                    To many Extra phases.
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn m-1 btn-primary" @click="addStep()">Add</button>
              <button type="button" class="btn m-1 btn-primary" @click="removeSteps()">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row" v-if="data">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
              <h5>Ability Draft Options</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-12">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_shuffle_player" v-model="data.options.shuffle_player">
                    <label class="custom-control-label" for="switch_shuffle_player">Disable player shuffle</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_per_player_time" v-model="data.options.switch_per_player_time">
                    <label class="custom-control-label" for="switch_per_player_time">Override time in seconds a player has to draft an ability</label>
                  </div>
                </div>
                <div class="col-xl-6">
                   <single-slider v-model="data.options.per_player_time" :min="1" :max="10"></single-slider>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_pre_round_time" v-model="data.options.switch_pre_round_time">
                    <label class="custom-control-label" for="switch_pre_round_time">Override time in seconds for break between rounds</label>
                  </div>
                </div>
                <div class="col-xl-6">
                  <single-slider v-model="data.options.pre_round_time"  :min="1" :max="30"></single-slider>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_pre_time" v-model="data.options.switch_pre_time">
                    <label class="custom-control-label" for="switch_pre_time">Override time in seconds before the draft starts.</label>
                  </div>
                </div>
                <div class="col-xl-6">
                  <single-slider v-model="data.options.pre_time" :min="10" :max="120"></single-slider>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="alert alert-warning" role="alert" >
                If you want the Additional Options to work you need set the Server Location to LOCAL HOST in the private lobby.
              </div>
            </div>
          </div>
          <br />
          <div class="card">
            <div class="card-header">
              <h5>Pool</h5>
              <p class="card-text">
                Shows the current state of the pool. Also allows you to manually override the heroes available in the pool for the next match.
              </p>
              <input v-model="filter" class="form-control" placeholder="Search" />
            </div>
            <div class="card-body">
              <template v-for="(hero) in pool" v-bind:key="hero.id">
                <div class="hero">
                  <img :src="hero.image_banner" class="image" v-bind:class="{ 'darkened-image': hero.eliminated }" @click="toggleHero(hero)" />
                </div>
              </template>
            </div>
          </div>
          <br />
          <div class="card">
            <div class="card-header">
              <h5>Matches</h5>
            </div>
            <div class="card-body">
              <ul>
                <template v-for="(match, i) in data.matches" v-bind:key="match.id">
                  <li>{{i}}</li>
                </template>
              </ul>
            </div>
            <div class="card-footer">
              <button type="button" class="btn m-1 btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>

      <div class="text-right fixed-bottom pb-4 pr-4">
        <button class="btn m-1 btn-success">
          <span @click="saveData">Save</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import data from '@/data/heroes.json';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import draggable from 'vuedraggable'
import MultiSelect from 'primevue/multiselect';
import RangeSlider from '@/components/RangeSlider.vue'
import SingleSlider from '@/components/SingleSlider.vue'
import Match from '@/components/Match.vue'

export default {
  name: "Elimination",
  components: {
    RangeSlider, SingleSlider, MultiSelect, Match, draggable
  },
  data() {
    return {
      filter: null,
      heroes: data,
      format: [],
      data: null,
    };
  },
  computed: {
    pool() {
      let f = this.filter?.toUpperCase();
      var pool = this.data.pool;
      var heroes = this.heroes.map(_ => ({ ...pool.find((x) => (x.id === _.id) && x), ..._ }));

      if(f) {
        return heroes.filter(_ => _.name.toUpperCase().includes(f) || _.aliases.toUpperCase().includes(f));
      }

      return heroes;
    },
    notEnoughPicks() {
      var picks = this?.data?.format?.filter(_ => _.type == 2)?.length ?? 0;
      return picks < 10;
    },
    toManyPicks() {
      var picks = this?.data?.format?.filter(_ => _.type == 2)?.length ?? 0;
      return picks > 10;
    },
    toManyExtra() {
      var picks = this?.data?.format?.filter(_ => _.type == 3)?.length ?? 0;
      return picks > 2;
    },
    test() {
      return this?.data?.options?.switch_pick_time ?? 30;
    },
  },
  created () {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      var id = this.$route.params.id;
      var url = `${process.env.VUE_APP_BASE_URL}/api/elimination/${id}`;
      var response = await axios.get(url);
      this.data = response.data;
    },
    async saveData() {
      var id = this.$route.params.id;
      var url = `${process.env.VUE_APP_BASE_URL}/api/elimination/${id}`;
      await axios.put(url, this.data);
      this.$wkToast('Saved!');
    },
    toggleHero(item) {
      var msg = item.eliminated ? `Are you sure we want to manually activate ${item.name}?` : `Are you sure we want to manually eliminate ${item.name}?`;
      var result = confirm(msg);
      if(!result) {
        return;
      }

      for (const hero of this.data.pool) {
        if(hero.id == item.id) {
          hero.eliminated = !hero.eliminated;
        }
      }
    },
    toggleSelection(format) {
      if(format.selected) {
        format.selected = false;
      } else {
        format.selected = true;
      }
    },
    toggleSide(format) {
      if(format.side == 0) {
        format.side = 1
      } else if (format.side == 1) {
        format.side = 0;
      }
    },
    togglePhase(format) {
      if(format.type == 1) {
        format.type = 2
      } else if (format.type == 2) {
        format.type = 3;
      } else if (format.type == 3) {
        format.type = 1;
      }
    },
    addStep() {
      var data = { id: uuid(), type: 1, side: 0 };
      this.data.format.push(data);
    },
    removeSteps() {
      this.data.format = this.data.format.filter(_ => !_.selected);
    },
    addMatch() {
      this.data.matches.push({
        id: uuid(),
        phases: [], // Type=(connected,ready,ban,pick,extra)/Team/Selection?/Time?
      });
    },
    removeMatch(id) {
      this.data.matches = this.data.matches.filter(_ => _.id != id);
    },
  },
  watch: {
    test: function (val) {
      console.log(val);
    }
  }
};
</script>

<style scoped>
.elimination-draft {
  padding: 4em 0 6em 0;
  text-align: left;
}
.hero {
  display: inline;
}
.image {
  padding: 2px;
  width: 70px;
  height: 40px;
}
.darkened-image { 
  filter: brightness(25%); 
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>