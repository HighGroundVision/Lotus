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
                <h5 class="d-inline align-middle" title="Time left in this phase" v-bind:class="{'blinking': time < 30 && time > 0}">
                  <span class="badge bg-secondary" v-if="timed" v-bind:class="{'bg-warning': time < 30 & time >= 10, 'bg-danger': time < 10}">{{time}}s</span>
                  <span class="badge bg-secondary" v-else>Timer Disabled</span>
                </h5>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-12">
                  <div class="px-1 my-1 rounded bg-success text-center text-white">
                    <span>Radiant</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-2">
                  <div v-if="radiantSequence.filter(_ => _.phase === 2).length > 0">
                    <div class="px-1 my-1 rounded bg-secondary text-white">
                      <span>Bans</span>
                    </div>
                    <template v-for="(item) in radiantSequence.filter(_ => _.phase === 2)" v-bind:key="item.i">
                      <img v-if="item.selection" :src="`https://hyperstone.highgroundvision.com/images/heroes/icon/${item.selection}.png`" />
                    </template>
                  </div>
                  <div v-if="radiantSequence.filter(_ => _.phase === 3).length > 0">
                    <div class="px-1 my-1 rounded bg-secondary text-white">
                      <span>Extra</span>
                    </div>
                    <template v-for="(item) in radiantSequence.filter(_ => _.phase === 3)" v-bind:key="item.i">
                      <img v-if="item.selection" :src="`https://hyperstone.highgroundvision.com/images/heroes/icon/${item.selection}.png`" />
                    </template>
                  </div>
                </div>
                <template v-for="(item, i) in radiantSequence.filter(_ => _.phase === 1)" v-bind:key="item.i">
                  <div class="col-xl-2">
                    <figure v-if="item.selection" class="figure">
                      <img class="w-100 border-top border-start border-end rounded-top" :src="`https://hyperstone.highgroundvision.com/images/heroes/profile/${item.selection}.png`" />
                      <figcaption class="figure-caption text-center bg-secondary text-white rounded-bottom">{{heroName(item.selection)}}</figcaption>
                    </figure>
                     <figure v-else class="figure">
                       <img class="w-100 border-top border-start border-end rounded-top" src="@/assets/unknown.png" />
                      <figcaption class="figure-caption text-center bg-secondary text-white rounded-bottom">Pick {{(i+1)}}</figcaption>
                      
                    </figure>
                  </div>
                </template>
              </div>
              <hr />
              <div class="row">
                <div class="col-xl-12">
                  <div class="px-1 my-1 rounded bg-danger text-center text-white">
                    <span>Dire</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-2">
                  <div v-if="direSequence.filter(_ => _.phase === 2).length > 0">
                     <div class="px-1 my-1 rounded bg-secondary text-white">
                      <span>Bans</span>
                    </div>
                    <template v-for="(item) in direSequence.filter(_ => _.phase === 2)" v-bind:key="item.i">
                      <img v-if="item.selection" :src="`https://hyperstone.highgroundvision.com/images/heroes/icon/${item.selection}.png`" />
                    </template>
                  </div>
                  <div v-if="direSequence.filter(_ => _.phase === 3).length > 0">
                    <div class="px-1 my-1 rounded bg-secondary text-white">
                      <span>Extra</span>
                    </div>
                    <template v-for="(item) in direSequence.filter(_ => _.phase === 3)" v-bind:key="item.i">
                      <img v-if="item.selection" :src="`https://hyperstone.highgroundvision.com/images/heroes/icon/${item.selection}.png`" />
                    </template>
                  </div>
                </div>
                <template v-for="(item, i) in direSequence.filter(_ => _.phase === 1)" v-bind:key="item.i">
                  <div class="col-xl-2">
                    <figure v-if="item.selection" class="figure">
                      <img class="w-100 border-top border-start border-end  rounded-top" :src="`https://hyperstone.highgroundvision.com/images/heroes/profile/${item.selection}.png`" />
                      <figcaption class="figure-caption text-center bg-secondary text-white rounded-bottom">{{heroName(item.selection)}}</figcaption>
                    </figure>
                    <figure v-else class="figure">
                      <img class="w-100 border-top border-start border-end  rounded-top" src="@/assets/unknown.png" />
                      <figcaption class="figure-caption text-center bg-secondary text-white rounded-bottom">Pick {{(i+1)}}</figcaption>
                    </figure>
                  </div>
                </template>
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
      <br />
      <div class="row">
        <div class="col-xl-12">
           <div class="card" >
            <div class="card-header">
              <h5>Additional Options</h5>
            </div>
            <div class="card-body" >
              <div class="row">
                <div class="col-xl-12">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="shuffle_player" v-model="shuffle_player">
                    <label class="form-check-label" for="shuffle_player">Disable Player Shuffle</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="switch_per_player_time" v-model="switch_per_player_time">
                    <label class="form-check-label" for="switch_per_player_time">Override total time in seconds a player has to draft an ability</label>
                  </div>
                </div>
                <div class="col-xl-6">
                   <single-slider v-model="per_player_time" :min="1" :max="10"></single-slider>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="switch_pre_round_time" v-model="switch_pre_round_time">
                    <label class="form-check-label" for="switch_pre_round_time">Override total time in seconds for break between rounds</label>
                  </div>
                </div>
                <div class="col-xl-6">
                  <single-slider v-model="pre_round_time"  :min="1" :max="30"></single-slider>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="switch_pre_time" v-model="switch_pre_time">
                    <label class="form-check-label" for="switch_pre_time">Override total time in seconds before the draft starts</label>
                  </div>
                </div>
                <div class="col-xl-6">
                  <single-slider v-model="pre_time" :min="30" :max="120"></single-slider>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="alert alert-warning" role="alert">
                If you want the Additional Options to work you need set the Server Location to LOCAL HOST in the private lobby.
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Commands :options="options" ></Commands>
    </div>  
  </div>
</template>

<script>
import data from '@/data/heroes.json';
import axios from 'axios';
import * as signalR from "@microsoft/signalr";
import Commands from '@/components/Commands.vue'
import SingleSlider from '@/components/SingleSlider.vue'

// TODO: Host Start
// TODO: Additional Options
// TODO: Commands

let interval = null;

export default {
  components: {
    Commands, SingleSlider
  },
  data() {
    return {
      lobby_id: null,
      started: false,
      teams: [],
      pool: [],
      phase: 0,
      sequence: [],
      timed: false,
      time: 0,
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
      let r = this.sequence.filter(_ => _.phase == 1).filter(_ => _.team == 0).filter(_ => _.selection > 0).map(_ => this.heroes.find(h => h.id == _.selection));
      let d = this.sequence.filter(_ => _.phase == 1).filter(_ => _.team == 1).filter(_ => _.selection > 0).map(_ => this.heroes.find(h => h.id == _.selection));
      let e = this.sequence.filter(_ => _.phase == 3).filter(_ => _.selection > 0).map(_ => this.heroes.find(h => h.id == _.selection));
      return {
        roster_radiant: r,
        roster_dire: d,
        roster_extra: e,
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
      return !this.started;
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
      return this.sequence.filter(_ => _.team === 0);
    },
    direSequence: function () {
      return this.sequence.filter(_ => _.team === 1);
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
    window.scrollTo(0, 0);
  },
  methods: {
    async fetchData() {
      this.lobby_id = this.$route.params.id;

      var url = `${process.env.VUE_APP_BASE_URL}/api/captains/${this.lobby_id}`;
      var response = await axios.get(url);

      this.pool = response.data.pool;
      this.sequence = response.data.sequence;
      this.phase = response.data.phase;
      this.teams = response.data.teams;
      this.timed = response.data.timed;
      this.started = response.data.started;

      if(this.phase > this.sequence.length)
        return;

      let round = this.sequence[this.phase];
      let item = response.data.teams[round.team];

      if(this.started  === true) {
        clearInterval(interval);
        interval = setInterval(() => {
          let delta = Math.round((Date.now() / 1000) - response.data._ts);
          let p = this.sequence[this.phase].phase;
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
    shareRadiant() {
      const team = this.teams[0];
      const url = `${window.location.origin}/#/captains-draft/lobby/${this.lobby_id}/${team.id}`;
      navigator.clipboard.writeText(url);
    },
    shareDire() {
      const team = this.teams[1];
      const url = `${window.location.origin}/#/captains-draft/lobby/${this.lobby_id}/${team.id}`;
      navigator.clipboard.writeText(url);
    },
    heroName(id) {
      return this.heroes.find(_ => _.id === id)?.name ?? "Unknown";
    },
    isActive(team, ) {

    },
    async start() {
      let body = {};
      var url = `${process.env.VUE_APP_BASE_URL}/api/captains/${this.lobby_id}/start`;
      var response = await axios.post(url, body);
    },
    async selectHero() {

      // let body = {
      //   hero: 0,
      //   phase: this.phase
      // };
      // var url = `${process.env.VUE_APP_BASE_URL}/api/captains/${this.lobby_id}/selection`;
      // var response = await axios.post(url, body);
    }
  },
  watch: {
    time: function (newValue, oldValue) {
      if(this.timed && newValue === 0) {
        clearInterval(interval);
        this.selectHero();
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