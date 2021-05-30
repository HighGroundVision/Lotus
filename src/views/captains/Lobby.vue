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
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-3">
            <div class="card-header">
              <h5 v-if="team_index == 1" class="d-inline align-middle">Radiant Lobby</h5>
              <h5 v-if="team_index == 2" class="d-inline align-middle">Dire Lobby</h5>
              <span v-if="isYourTurn" class="d-inline mx-2 p-2 badge bg-primary">Your Turn</span>
              <span v-if="isOpponentsTurn" class="d-inline mx-2 p-2 badge bg-secondary">Opponents Turn</span>
              <div class="float-end">
                <h5 class="d-inline align-middle" title="Time left in this phase">Clock Disabled</h5>
              </div>
              <!--
              <div v-if="isYourTurn" class="float-end">
                <h5 class="d-inline align-middle" title="Time left in this phase">Time Limit</h5>
                <span class="mx-2 p-2 badge bg-danger text-white blinking">10</span>
              </div>
              <div v-if="isOpponentsTurn" class="float-end">
                <h5 class="d-inline align-middle" title="Time left in this phase">Time Limit</h5>
                <span class="mx-2 p-2 badge bg-secondary text-white">20 + 130</span>
              </div>
              -->
            </div>
            <!-- -->
            <div class="card-body">
              <div class="row" >
                <div class="col-xl-9">
                  <div style="position: sticky; top: 80px;">
                    <div class="row my-2" >
                      <div class="col-xl-12">
                        <div class="border border-danger shadow">
                          <template v-for="(hero) in strHeroes" v-bind:key="hero.id">
                            <div class="d-inline">
                              <img @click="toggleHero(hero.id)" :src="hero.image_banner" class="image" v-bind:class="{ 'darkened-image': isDisabled(hero.id) }" />
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="row my-2">
                      <div class="col-xl-12">
                        <div class="border border-success shadow">
                          <template v-for="(hero) in agiHeroes" v-bind:key="hero.id">
                            <div class="d-inline">
                              <img @click="toggleHero(hero.id)" :src="hero.image_banner" class="image" v-bind:class="{ 'darkened-image': isDisabled(hero.id) }" />
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="row my-2">
                      <div class="col-xl-12">
                        <div class="border border-primary shadow">
                          <template v-for="(hero) in intHeroes" v-bind:key="hero.id">
                            <div class="d-inline">
                              <img @click="toggleHero(hero.id)" :src="hero.image_banner" class="image" v-bind:class="{ 'darkened-image': isDisabled(hero.id) }" />
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3">
                  <div class="row" >
                    <div class="col-xl-12">
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
                  <hr />
                  <div class="d-flex">
                     <div class="p-1 mx-1 mt-1 rounded bg-success bg-gradient text-white w-50">
                      <div>
                        <img src="@/assets/radiant.png" class="float-end rounded" style="height: 24px;" />
                        <span>Radiant</span>
                      </div>
                    </div>
                    <div class="p-1 mx-1 mt-1 rounded bg-danger bg-gradient text-white w-50">
                      <div>
                        <img src="@/assets/dire.png" class="float-end rounded" style="height: 24px;" />
                          <span>Dire</span>
                      </div>
                    </div>
                  </div>
                  <div > <!--  style="height: 500px; overflow-y: auto;" -->
                    <template v-for="(item, i) in sequence" v-bind:key="i">
                      <div v-if="item.team === 1" class="d-flex">
                        <div class="p-1 mx-1 mt-1 rounded text-white w-50" v-bind:class="{'bg-primary':i === phase, 'bg-secondary':i !== phase}"> <!--- -->
                          <span v-if="item.phase === 1">Pick</span>
                          <span v-else-if="item.phase === 2">Ban</span>
                          <span v-else-if="item.phase === 3">Extra</span>
                          <img v-if="item.selection" class="float-end" :src="`https://hyperstone.highgroundvision.com/images/heroes/icon/${item.selection}.png`" style="height: 24px;" />
                        </div>
                        <div class="p-1 mx-1 mt-1 rounded bg-white text-white w-50">
                        </div>
                      </div>
                      <div v-if="item.team === 2" class="d-flex">
                        <div class="p-1 mx-1 mt-1 rounded bg-white text-white w-50">
                        </div>
                        <div class="p-1 mx-1 mt-1 rounded text-white w-50" v-bind:class="{'bg-primary':i === phase, 'bg-secondary':i !== phase}"> <!--- -->
                          <span v-if="item.phase === 1">Pick</span>
                          <span v-else-if="item.phase === 2">Ban</span>
                          <span v-else-if="item.phase === 3">Extra</span>
                          <img v-if="item.selection" class="float-end" :src="`https://hyperstone.highgroundvision.com/images/heroes/icon/${item.selection}.png`" style="height: 24px;" />
                        </div>
                        
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
</template>

<script>
import data from '@/data/heroes.json';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import * as signalR from "@microsoft/signalr";

// TODO: Implement Clock
// TODO: Captains Ready
// TODO: Draft Complete

export default {
  components: {},
  data() {
    return {
      lobby_id: null,
      team_id: null,
      team_index: 0,
      pool: [],
      phase: 0,
      sequence: [],
      time_picks: 0,
      time_bans: 0,
      time_extra: 0,
      time_bonus: 0,
      selection: null,
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
      return this.sequence.filter(_ => _.team === 1);
    },
    direSequence: function () {
      return this.sequence.filter(_ => _.team === 2);
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
  methods: {
    async fetchData() {
      this.lobby_id = this.$route.params.id;
      this.team_id = this.$route.params.team;

      var url = `${process.env.VUE_APP_BASE_URL}/api/captains/${this.lobby_id}`;
      var response = await axios.get(url);

      this.pool = response.data.pool;
      this.sequence = response.data.sequence;
      this.phase = response.data.phase;
      this.team_index = response.data.teams.find(_ => _.id == this.team_id)?.team ?? 0;
    },
    signalR() {
      var url = `${process.env.VUE_APP_BASE_URL}/api/captains/${this.lobby_id}`;
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .configureLogging(signalR.LogLevel.Information)
        .build();
    
      let self = this;
      connection.on("update", (phase, hero) => {     
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
    async selectHero() {
      if(this.selection) {
        let body = {
          hero: this.selection.id,
          phase: this.phase
        };
        var url = `${process.env.VUE_APP_BASE_URL}/api/captains/${this.lobby_id}/selection`;
        var response = await axios.post(url, body);
        this.selection = null;
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
.image {
  padding: 2px;
  width: 78px;
  /*height: 45px;*/
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