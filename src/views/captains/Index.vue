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
              <h5>Select Hero Pool</h5>
              <p class="card-text">
                The lobby host populates the pool of available heroes. 
                By default all heroes are include but the host can manually select which heroes to disable.
                We have included options to reset the hero selection.
                We have also included the limit draft option that selects 9 of each type randomly.
                As well as a random option to select a number of random heroes from all types.
              </p>
            </div>
            <div class="card-body text-center">
              <div class="row">
                <div class="col-xl-9">
                  <input v-model="filter" class="form-control" placeholder="Search" />
                </div>
                <div class="col-xl-3">
                  <div class="btn-group me-2" role="group">
                    <button @click="selectAllHeroes" type="button" class="btn btn-secondary">All</button>
                    <button @click="selectNoHeroes" type="button" class="btn btn-secondary">None</button>
                  </div>
                  <div class="btn-group" role="group">
                    <button @click="selectLimitedHeroes" type="button" class="btn btn-secondary">Limited</button>
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-random">Random</button>
                  </div>
                </div>
              </div>
              <hr />
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
                          <img @click="toggleHero(hero.id)" :src="hero.image_banner" class="image" v-bind:class="{ 'darkened-image': !isSelected(hero) }" />
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
                          <img @click="toggleHero(hero.id)" :src="hero.image_banner" class="image" v-bind:class="{ 'darkened-image': !isSelected(hero) }" />
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
                          <img @click="toggleHero(hero.id)" :src="hero.image_banner" class="image" v-bind:class="{ 'darkened-image': !isSelected(hero) }" />
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
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-3">
            <div class="card-header">
             <h5>Sequence</h5>
             <p class="card-text">
                The host can build a sequence for the bans, picks and extra phases.
                As well we have included a number of default sequences used in other modes.
                Selecting a hero in a ban phase neither captain can pick it in a future phase.
                Selecting a hero in a pick phase will add it to that teams roster.
                Selecting a hero in an extra phase will add it to the extra pool, their abilities are in the pool but neither team gets the hero model.
                A Sequence should contain at least 10 pick phases (5 for each team).
            </p>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="switch_sequence_mode" v-model="switch_sequence_mode">
              <label v-if="switch_sequence_mode" class="form-check-label" for="switch_sequence_mode">Advanced</label>
              <label v-else class="form-check-label" for="switch_sequence_mode">Simple</label>
            </div>
            </div>
            <div class="card-body">
              <!-- Modify Sequence (5 Picks | 1 Extras | 7 Ban) -->
              <div v-if="switch_sequence_mode" class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with Phases">
                <span class="navbar-brand mb-0 h1">Add Phase</span>
                <div class="btn-group me-2" role="group">
                  <button @click="addPhase(1,1)" type="button" class="btn btn-success">Pick</button>
                  <button @click="addPhase(1,2)" type="button" class="btn btn-success">Ban</button>
                  <button @click="addPhase(1,3)" type="button" class="btn btn-success">Extra</button>
                  <button @click="addPhase(2,1)" type="button" class="btn btn-danger">Pick</button>
                  <button @click="addPhase(2,2)" type="button" class="btn btn-danger">Ban</button>
                  <button @click="addPhase(2,3)" type="button" class="btn btn-danger">Extra</button>
                </div>
                <span class="navbar-brand mb-0 h1">Commands</span>
                <div class="btn-group me-2" role="group">
                  <button @click="removePhase" type="button" class="btn btn-secondary">Remove Phase</button>
                  <button @click="invertSequence" type="button" class="btn btn-secondary">Invert Teams</button>
                  <button @click="sequenceClear" type="button" class="btn btn-secondary">Clear Sequence</button>
                </div>
              </div>
              <div  v-else  class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with Phases">
                <span class="navbar-brand mb-0 h1">Sequences</span>
                <div class="btn-group me-2" role="group">
                  <button @click="sequenceAlpha()" type="button" class="btn btn-secondary">Alpha</button>
                  <button @click="sequenceBeta()" type="button" class="btn btn-secondary">Beta</button>
                  <button @click="sequenceGamma()" type="button" class="btn btn-secondary">Gamma</button>
                  <button @click="sequenceDelta()" type="button" class="btn btn-secondary">Delta</button>
                  <button @click="sequenceEpsilon()" type="button" class="btn btn-secondary">Epsilon</button>
                  <button @click="sequenceZeta()" type="button" class="btn btn-secondary">Zeta</button>
                </div>
              </div>
              <hr />
              <template v-for="(item, i) in sequence" v-bind:key="i">
                <div class="d-inline p-1 ms-1 rounded" v-bind:class="{ 'bg-success text-white': item.team === 1, 'bg-danger text-white': item.team === 2 }">
                  <span v-if="item.phase === 1">Pick</span>
                  <span v-else-if="item.phase === 2">Ban</span>
                  <span v-else-if="item.phase === 3">Extra</span>
                </div>
                <div v-if="sequence[i+1]?.phase != sequence[i].phase" class="d-inline p-1 ms-1 rounded">
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-3">
            <div class="card-header">
              <h5>Time Limits</h5>
              <p class="card-text">
                The host can set the time in seconds that are allotted for bans, picks, and extra phases as well as Reserve time that can be used throughout any selection. 
                If time runs out during a ban selection, no hero will be banned; if time runs out during a pick selection, a random hero will be chosen. 
                We have also included a Reserve time that can be used in any phases.
                As well we have included a number of default timings used in other modes.
              </p>
            </div>
            <div class="card-body">
              <!-- Modify Time limits MODE:(Bans:30 | Picks: 30 | Extra:10 | Reserve:130) vs DRAFT:(Bans:0 | Picks:0 | Extra:0 | Reserve:180) -->
              <div class="btn-group me-2" role="group">
                <button @click="timeDefault" type="button" class="btn btn-secondary">Default</button>
                <button @click="timeQuick" type="button" class="btn btn-secondary">Quick</button>
                <button @click="timePool" type="button" class="btn btn-secondary">Pool</button>
              </div>
              <hr />
              <label>Time allotted for picks</label>
              <single-slider v-model="time_picks" :min="0" :max="100"></single-slider>
              <label>Time allotted for bans</label>
              <single-slider v-model="time_bans" :min="0" :max="100"></single-slider>
              <label>Time allotted for extra</label>
              <single-slider v-model="time_extra" :min="0" :max="100"></single-slider>
              <label>Reserve Time</label>
              <single-slider v-model="time_reserve" :min="0" :max="300"></single-slider>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-3">
            <div class="card-header">
             <h5>Create Lobby</h5>
            </div>
            <div class="card-body">
              After you happy with the options selected and they don't cause any validation issues you can create a lobby.
              As the host you will see both sides of the draft but you will not be able to interact with it.
              The host can only control when to start the after both captains are ready.
              The host will need to share a link with each captain (each captain gets their own link).
              The teams should already have picked a side before they ready up.
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-success" :disabled="!valid" @click.prevent="create">Create</button>
            </div>
          </div>
        </div>
      </div>   
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal-random" tabindex="-1" role="dialog"  aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Number of Random Heroes</h5>
          </div>
          <div class="modal-body">
            <single-slider v-model="numberOfHeroesForRandom" :min="10" :max="100"></single-slider>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="selectRandomHeroes">Random</button>
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
import SingleSlider from '@/components/SingleSlider.vue'
import { Alpha, Beta, Gamma, Delta, Epsilon, Zeta } from './sequence';

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function* getRandomHeroes(key, size) {
    var collection = key ? data.filter(_ => _.primary_attribute == key) : data;
    var selection = Array.from(Array(collection.length).keys());
    shuffle(selection);
    var selection = selection.slice(0, size);
    for (const i of selection) {
        yield collection[i].id;
    }
}

export default {
  components: {
    SingleSlider
  },
  data() {
    return {
      filter: null,
      pool: data.map(_ => _.id),
      numberOfHeroesForRandom: 20,
      switch_sequence_mode: false,
      sequence: [],
      time_picks: 30,
      time_bans: 30,
      time_extra: 10,
      time_reserve: 130,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.scrollTo(0, 0);
    })
  },
  computed: {
    valid() {
      return this.pool.length > 10 && this.sequence.filter(_ => _.phase == 1).length == 10;
    },
    heroes: function () {
      let f = this.filter;
      if(f) {
        f = f.toLowerCase();
        return data.filter(_ => _.name.toLowerCase().includes(f) || _.aliases.includes(f));
      } else {
        return data;
      }
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
  },
  methods: {
    async create() {
      let body = {
        started: false,
        pool: this.pool,
        sequence: this.sequence,
        phase: 0,
        teams: [
          { 
            id: uuid(), 
            team: 1,
            ready: false,
            time_picks: this.time_picks,
            time_bans: this.time_bans,
            time_extra: this.time_extra,
            time_reserve: this.time_reserve,
          },
          { 
            id: uuid(), 
            team: 2,
            ready: false,
            time_picks: this.time_picks,
            time_bans: this.time_bans,
            time_extra: this.time_extra,
            time_reserve: this.time_reserve,
          }
        ]
      };
      var url = `${process.env.VUE_APP_BASE_URL}/api/captains/`;
      var response = await axios.post(url, body);
      this.$router.push(`/captains-draft/host/${response.data.id}`);
    },
    isSelected(hero) {
      return this.pool.includes(hero.id);
    },
    toggleHero(id) {
      this.filter = null;
      if(this.pool.includes(id)) {
        this.pool = this.pool.filter(i => i !== id);
      } else {
        this.pool.push(id);
      }
    },
    selectAllHeroes() {
      this.pool = this.heroes.map(_ => _.id);
    },
    selectNoHeroes() {
      this.pool = [];
    },
    selectLimitedHeroes() {
      let collection = [...getRandomHeroes("STRENGTH", 9), ...getRandomHeroes("AGILITY", 9), ...getRandomHeroes("INTELLECT", 9)]
      this.pool = [];
      for (const id of collection) {
        this.pool.push(id);
      }
    },
    selectRandomHeroes() {
      let collection = getRandomHeroes(undefined, this.numberOfHeroesForRandom);
      this.pool = [];
      for (const id of collection) {
        this.pool.push(id);
      }
    },
    addPhase(team, phase) {
      this.sequence.push({ team, phase });
    },
    removePhase() {
      this.sequence.pop();
    },
    sequenceClear() {
      this.sequence = [];
    },
    invertSequence() {
      for (const item of this.sequence) {
        if(item.team === 1) {
          item.team = 2;
        } else if (item.team === 2) {
          item.team = 1;
        }
      }
    },
    sequenceAlpha() {
      this.sequence = Alpha.slice();
    },
    sequenceBeta() {
      this.sequence = Beta.slice();
    },
    sequenceGamma() {
      this.sequence = Gamma.slice();
    },
    sequenceDelta() {
      this.sequence = Delta.slice();
    },
    sequenceEpsilon() {
      this.sequence = Epsilon.slice();
    },
    sequenceZeta() {
      this.sequence = Zeta.slice();
    },
    timeDefault() {
      this.time_picks = 30;
      this.time_bans = 30;
      this.time_extra = 10;
      this.time_reserve = 130;
    },
    timeQuick() {
      this.time_picks = 10;
      this.time_bans = 10;
      this.time_extra = 5;
      this.time_reserve = 30;
    },
    timePool() {
      this.time_picks = 0;
      this.time_bans = 0;
      this.time_extra = 0;
      this.time_reserve = 180;
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
  width: 70px;
  height: 40px;
}
.darkened-image { 
  filter: brightness(25%); 
}
</style>
