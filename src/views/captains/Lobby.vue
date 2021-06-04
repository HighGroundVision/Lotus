<template>
  <div class="captains-draft">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="card" >
            <div class="card-body" >
              <h1>Captains Duel</h1>
              <p class="card-text">
                Where the captains picks the heroes and players pick the abilities.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div v-if="started" class="row">
        <div class="col-xl-12">
          <div class="card mb-3">
            <div class="card-header">
              <h5 v-if="team_index == 0" class="d-inline align-middle">Radiant Lobby</h5>
              <h5 v-if="team_index == 1" class="d-inline align-middle">Dire Lobby</h5>
              <span v-if="isYourTurn" class="d-inline mx-2 p-2 badge bg-primary">Your Turn</span>
              <span v-if="isOpponentsTurn" class="d-inline mx-2 p-2 badge bg-secondary">Opponents Turn</span>
              <div v-if="isRunning" class="float-end">
                <h5 class="d-inline align-middle" title="Time left in this phase" v-bind:class="{'blinking': time < 10 && time > 0}">
                  <span class="badge bg-secondary" v-if="timed" v-bind:class="{'bg-danger': time < 10}">{{time}}s</span>
                  <span class="badge bg-secondary" v-else>Timer Disabled</span>
                </h5>
              </div>
            </div>
            <div class="card-body">
              <div class="row" >
                <div class="col-xl-9">
                  <div> <!-- style="position: sticky; top: 90px;" -->
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="py-2">
                          <div class="p-2 bg-danger bg-gradient text-white rounded-top shadow">
                            <img src="@/assets/strength.png" />
                            <b>Strength</b>
                            <br />
                          </div>
                          <div class="border border-danger shadow">
                            <template v-for="(hero) in strHeroes" v-bind:key="hero.id">
                              <div class="d-inline">
                                <img @click="toggleHero(hero.id)" :src="hero.image_banner" class="w-25 p-1" v-bind:class="{ 'darkened-image': isDisabled(hero.id) }" />
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-4">
                        <div class="py-2">
                          <div class="p-2 bg-success bg-gradient text-white rounded-top shadow">
                            <img src="@/assets/agility.png" />
                            <b>Agility</b>
                            <br />
                          </div>
                          <div class="border border-success shadow">
                            <template v-for="(hero) in agiHeroes" v-bind:key="hero.id">
                              <div class="d-inline">
                                <img @click="toggleHero(hero.id)" :src="hero.image_banner" class="w-25 p-1" v-bind:class="{ 'darkened-image':  isDisabled(hero.id) }" />
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-4">
                        <div class="py-2">
                          <div class="p-2 bg-primary bg-gradient text-white rounded-top shadow">
                            <img src="@/assets/intelligence.png" />
                            <b>Intelligence</b>
                          </div>
                          <div class="border border-primary shadow">
                            <template v-for="(hero) in intHeroes" v-bind:key="hero.id">
                              <div class="d-inline">
                                <img @click="toggleHero(hero.id)" :src="hero.image_banner" class="w-25 p-1" v-bind:class="{ 'darkened-image':  isDisabled(hero.id) }" />
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3">
                  <div class="row mb-3" >
                    <div class="col-xl-12" >
                      <div v-if="isYourTurn && selection" class="d-grid gap-2">
                        <button @click="selectHero" class="btn btn-primary" style="min-height: 50px;">
                          <span v-if="isPickPhase" class="px-1">Pick</span>
                          <span v-if="isBanPhase" class="px-1">Ban</span>
                          <span v-if="isExtraPhase" class="px-1">Extra</span>
                          <span class="px-1">{{selection.name}}</span>
                          <img class="px-1" :src="selection.image_icon" />
                        </button>
                      </div>
                      <div v-else class="d-grid gap-2">
                        <button disabled class="btn btn-secondary" style="min-height: 50px;">
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="w-100">
                      <div class="rounded bg-white bg-gradient text-white text-center">
                        <img src="@/assets/radiant.png" class="rounded" style="height: 40px;" title="Radiant"  />
                      </div>
                      <div class="d-flex flex-column">
                        <template v-for="(item) in radiantSequence" v-bind:key="item.i">
                          <div class="m-1 p-1 rounded" v-bind:class="{'bg-warning text-dark current-phase':item.i === phase, 'bg-secondary text-white':item.i !== phase}">
                            <!--<span>{{humanize(item.i)}}&nbsp;</span>-->
                            <span v-if="item.phase === 1">Pick</span>
                            <span v-else-if="item.phase === 2">Ban</span>
                            <span v-else-if="item.phase === 3">Extra</span>
                            <img v-if="item.selection" class="float-end" :src="`https://hyperstone.highgroundvision.com/images/heroes/icon/${item.selection}.png`" style="height: 24px;" />
                          </div>
                        </template>
                      </div>
                    </div>
                    <div class="w-100">
                      <div class="rounded bg-white bg-gradient text-white text-center">
                        <img src="@/assets/dire.png" class="rounded" style="height: 40px;" title="Dire" />
                      </div>
                      <div class="d-flex flex-column">
                        <template v-for="(item) in direSequence" v-bind:key="item.i">
                          <div class="m-1 p-1 rounded " v-bind:class="{'bg-warning text-dark current-phase':item.i === phase, 'bg-secondary text-white':item.i !== phase}">
                            <!--<span>{{humanize(item.i)}}&nbsp;</span>-->
                            <span v-if="item.phase === 1">Pick</span>
                            <span v-else-if="item.phase === 2">Ban</span>
                            <span v-else-if="item.phase === 3">Extra</span>
                            <img v-if="item.selection" class="float-end" :src="`https://hyperstone.highgroundvision.com/images/heroes/icon/${item.selection}.png`" style="height: 24px;" />
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>            
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-xl-12">
          <div class="card mb-3">
            <div class="card-header">
              <h5 v-if="team_index === 0" class="d-inline align-middle">Radiant Lobby</h5>
              <h5 v-if="team_index === 1" class="d-inline align-middle">Dire Lobby</h5>
            </div>
            <div class="card-body">
              Please wait for the host to start the draft.
              <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from '@/data/heroes.json';
import axios from 'axios';
// import { v4 as uuid } from 'uuid';
import * as signalR from "@microsoft/signalr";
import humanize from "humanize";

// TODO: Implement Clock
// TODO: Captains Ready
// TODO: Draft Complete

let interval = null;

export default {
  components: {},
  data() {
    return {
      started: false,
      lobby_id: null,
      team_id: null,
      team_index: 0,
      pool: [],
      phase: 0,
      sequence: [],
      selection: null,
      timed: false,
      time: null
    };
  },
  computed: {
    heroes: function () {
      return data.slice();
    },
    strHeroes: function () {
      return this.heroes.filter(_ => _.primary_attribute === "STRENGTH");
    },
    agiHeroes: function () {
      return this.heroes.filter(_ => _.primary_attribute === "AGILITY");
    },
    intHeroes: function () {
      return this.heroes.filter(_ => _.primary_attribute === "INTELLECT");
    },
    radiantSequence: function () {
      return this.sequence.filter(_ => _.team === 0);
    },
    direSequence: function () {
      return this.sequence.filter(_ => _.team === 1);
    },
    isRunning: function() {
      return true; //!this.sequence.filter(_ => _.phase === 1).every(_ => _.selection);
    },
    isPickPhase: function () {
      let next = this.sequence[this.phase];
      if(next) {
        return next.team == this.team_index && next.phase == 1;
      } else {
        return false;
      }
    },
    isBanPhase: function () {
      let next = this.sequence[this.phase];
      if(next) {
        return next.team == this.team_index && next.phase == 2;
      } else {
        return false;
      }
    },
    isExtraPhase: function () {
      let next = this.sequence[this.phase];
      if(next) {
        return next.team == this.team_index && next.phase == 3;
      } else {
        return false;
      }
    },
    isYourTurn: function() {
      let next = this.sequence[this.phase];
      if(next) {
        return next.team == this.team_index;
      } else {
        return false;
      }
    },
    isOpponentsTurn: function() {
      let next = this.sequence[this.phase];
      if(next) {
        return !(next.team == this.team_index);
      } else {
        return false;
      }
    }
  },
  created () {
    this.fetchData();
    this.signalR();
  },
  mounted() {
    // Scroll
  },
  methods: {
    async fetchData() {
      this.lobby_id = this.$route.params.id;
      this.team_id = this.$route.params.team;

      var url = `${process.env.VUE_APP_BASE_URL}/api/captains/${this.lobby_id}`;
      var response = await axios.get(url);

      this.selection = null;
      this.pool = response.data.pool;
      this.sequence = response.data.sequence;
      this.phase = response.data.phase;
      this.timed = response.data.timed;
      this.started = response.data.started;
      let item = response.data.teams.find(_ => _.id == this.team_id);
      this.team_index = response.data.teams.indexOf(item);

      if(this.phase > this.sequence.length)
        return;

      let p = this.sequence[this.phase].phase;
      let timestamp = response.data._ts;

      if(this.started  === true) {
        clearInterval(interval);
        interval = setInterval(() => {
          let delta = Math.round((Date.now() / 1000) - timestamp);
          this.time = (item.times[0] + item.times[p]) - delta;
        }, 1000);
      } else {
        this.timed = false;
      }
    },
    signalR() {
      var url = `${process.env.VUE_APP_BASE_URL}/api/captains/${this.lobby_id}`;
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .configureLogging(signalR.LogLevel.Information)
        .build();
    
      let self = this;
      connection.on("update", (a) => {     
        self.fetchData();
      });

      connection.start();
    },
    isDisabled(id) {
      return this.pool.includes(id) == false || this.sequence.filter(_ => _.selection > 0).map(_ => _.selection).includes(id);
    },
    toggleHero(id) {
      if(!this.isDisabled(id)) {
        this.selection = this.heroes.find(_ => _.id == id);
      }
    },
    humanize(i) {
      return humanize.ordinal(i+1);
    },
    async selectHero() {
      if(!this.selection) {
        return;
      }

      let body = {
        hero: this.selection.id,
        phase: this.phase
      };
      var url = `${process.env.VUE_APP_BASE_URL}/api/captains/${this.lobby_id}/selection`;
      var response = await axios.post(url, body);
      this.selection = null;
    }
  },
  watch: {
    time: function (newValue, oldValue) {
      if(this.timed && newValue === 0) {
        clearInterval(interval);
      }
    }
  }
};
</script>

<style scoped>
.captains-draft {
  padding: 4em 0 6em 0;
  text-align: left;
}
.hero-roster {
  padding: 2px;
  height: 45px;
}
.hero-ban {
  height: 45px;
}
.hero-selection {
  padding: 2px;
  height: 45px;
}
.darkened-image { 
  filter: brightness(25%); 
}
.blinking {
  animation: blinker 1s linear infinite;
}
@keyframes blinker {  
  50% { opacity: 0; }
}
</style>