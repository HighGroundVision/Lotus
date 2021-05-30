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
              <h5 class="d-inline align-middle">Lobby</h5>
              <div class="float-end">
                <h5 class="d-inline align-middle" title="Time left in this phase">Clock Disabled</h5>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-9">
                  <div style="position: sticky; top: 80px;">
                    <div class="row my-2">
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
                  <div > <!-- style="height: 600px; overflow-y: auto;" -->
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
            <div class="card-footer">
              <div class="dropdown d-inline">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownShare" data-bs-toggle="dropdown" aria-expanded="false">
                  Share
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownShare">
                  <li><a @click="shareRadiant" class="dropdown-item" >Radiant Link</a></li>
                  <li><a @click="shareDire" class="dropdown-item" >Dire Link</a></li>
                </ul>
              </div>
              <button :disabled="!playersReady" type="button" class="btn btn-success mx-1" @click="start">Start</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Additional Options -->
      <Commands :options="options" ></Commands>
    </div>  
  </div>
</template>

<script>
import data from '@/data/heroes.json';
import axios from 'axios';
import * as signalR from "@microsoft/signalr";
import Commands from '@/components/Commands.vue'

// TODO: Host Start
// TODO: Additional Options
// TODO: Commands

export default {
  components: {
    Commands
  },
  data() {
    return {
      lobby_id: null,
      teams: [],
      pool: [],
      phase: 0,
      sequence: [],
      time_picks: 0,
      time_bans: 0,
      time_extra: 0,
      time_bonus: 0,
      // Additional
      shuffle_player: false,
      switch_per_player_time: false,
      per_player_time: 7,
      switch_pre_round_time: false,
      pre_round_time: 5,
      switch_pre_time: false,
      pre_time: 60,
    };
  },
  computed: {
     options: function () {
      return {
        roster_radiant: this.radiantSequence,
        roster_dire: this.direSequence,
        roster_extra: this.extraSequence,
        shuffle_player: this.shuffle_player,
        switch_per_player_time: this.switch_per_player_time,
        per_player_time: this.per_player_time,
        switch_pre_round_time: this.switch_pre_round_time,
        pre_round_time: this.pre_round_time,
        switch_pre_time: this.switch_pre_time,
        pre_time: this.pre_time,
      };
    },
    playersReady: function() {
      return false;
    },
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
      debugger;
      return this.sequence.filter(_ => _.phase === 1 && _.team === 1).filter(_ => _.selection > 0).map(_ => data.find(i => i.id == _.selection));
    },
    direSequence: function () {
      return this.sequence.filter(_ => _.phase === 1 && _.team === 2).filter(_ => _.selection > 0).map(_ => data.find(i => i.id == _.selection));
    },
    extraSequence: function () {
      return this.sequence.filter(_ => _.phase === 3).filter(_ => _.selection > 0).map(_ => data.find(i => i.id == _.selection));
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
      this.teams = response.data.teams;
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
    shareRadiant() {
      debugger;
      const team = this.teams.find(_ => _.team === 1);
      const url = `${window.location.origin}/#/captains-draft/lobby/${this.lobby_id}/${team.id}`;
      navigator.clipboard.writeText(url);
    },
    shareDire() {
      const team = this.teams.find(_ => _.team === 2);
      const url = `${window.location.origin}/#/captains-draft/lobby/${this.lobby_id}/${team.id}`;
      navigator.clipboard.writeText(url);
    },
  },
  watch: {
    options: function (val) {
      console.log(val);
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