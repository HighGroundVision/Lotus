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
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
             <h5>Create Series</h5>
            </div>
            <div class="card-body">
              <p class="card-text">
                
                This allows you to control the hero pool before/after each match.
                The Captains will have the ability to ban and pick heroes for the roster.
                There is an option to control which team starts first.
                There is an option to control the number of bans before the picks.
                There are options to control the timing for each step.
                <!--Viewers?-->
              </p>
               <div class="form-group">
                <label for="format">Format</label>
                <select class="form-control" id="format" v-model="format">
                  <option :value="1">Standard</option>
                </select>
              </div>
              <div class="form-group">
                <label for="phases">Phases</label>
                <select class="form-control" id="phases" v-model="matches">
                  <option :value="1">Best of 1</option>
                  <option :value="3">Best of 3</option>
                  <option :value="5">Best of 5</option>
                  <option :value="7">Best of 7</option>
                </select>
              </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-success" :disabled="!valid" @click.prevent="create">Create</button>
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

function standardFormat() {
  return [
    { id: uuid(), type: 1, side: 0 },
    { id: uuid(), type: 1, side: 1 },       
    { id: uuid(), type: 3, side: 0 },
    { id: uuid(), type: 3, side: 1 },
    { id: uuid(), type: 1, side: 0 },
    { id: uuid(), type: 1, side: 1 },
    { id: uuid(), type: 2, side: 0 },
    { id: uuid(), type: 2, side: 1 },
    { id: uuid(), type: 2, side: 0 },
    { id: uuid(), type: 2, side: 1 },
    { id: uuid(), type: 2, side: 0 },
    { id: uuid(), type: 2, side: 1 },
    { id: uuid(), type: 2, side: 0 },
    { id: uuid(), type: 2, side: 1 },
    { id: uuid(), type: 2, side: 0 },
    { id: uuid(), type: 2, side: 1 },    
  ];
}

function defaultOptions() {
  return {
    // Hero Draft
    switch_pick_time: false,
    pick_time: 30,
    switch_ban_time: false,
    ban_time: 30,
    switch_ban_eliminated: false,
    switch_extra_time: false,
    extra_time: 10,       
    switch_extra_eliminated: false,
    // Ability Draft
    shuffle_player: false,
    switch_per_player_time: false,
    per_player_time: 7,
    switch_pre_round_time: false,
    pre_round_time: 5,
    switch_pre_time: false,
    pre_time: 60,
  };
}

export default {
  data() {
    return {
      format: 1,
      matches: 3,
    };
  },
  computed: {
    valid() {
      return true;
    }
  },
  methods: {
    async create() {
      let value = this.matches;
      let range = Array.from(Array(value).keys());
      let matches = range.map(_ => {
        return {
          id: uuid(),
          phases: [], // Type=(connected,ready,ban,pick,extra)/Team/Selection?/Time?
        };
      });
      
      let body = {
        pool: data.map(_ => { return { id: _.id, eliminated: false } }),
        matches: matches,
        format: standardFormat(),
        options: defaultOptions(),
      };
      var url = `${process.env.VUE_APP_BASE_URL}/api/elimination/`;
      var response = await axios.post(url, body);
      this.$router.push(`/elimination/${response.data.id}/series`);
    }
  }
};
</script>

<style scoped>
.elimination-draft {
  padding: 4em 0 6em 0;
  text-align: left;
}
</style>