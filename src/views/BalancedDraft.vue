<template>
  <div class="admin">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="card" >
            <div class="card-body" >
              <h1>Balanced Draft</h1>
              <p class="card-text">
                The draft is still randomly generated but there are a number of additional switches to Disqualify Heroes, Balance the Teams, and Order the Roster.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row" >
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
             <h5>Switches</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-12">
                  <div class="custom-control custom-switch ">
                    <input type="checkbox" class="custom-control-input" id="switch_random_radiant" v-model="switch_random_radiant">
                    <label class="custom-control-label" for="switch_random_radiant">Keep Radiant Heroes Randomize</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-12">
                  <div class="custom-control custom-switch ">
                    <input type="checkbox" class="custom-control-input" id="switch_random_dire" v-model="switch_random_dire">
                    <label class="custom-control-label" for="switch_random_dire">Keep Dire Heroes Randomize</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-12">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_random_extras" v-model="switch_random_extras">
                    <label class="custom-control-label" for="switch_random_extras">Keep Extras Heroes Randomize</label>
                  </div>
                </div>
              </div>
              <div>
                <hr />
                <h5 class="text-center">Filters</h5>
                <hr />
                <div class="row">
                  <div class="col-xl-6">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="switch_roles" v-model="switch_roles">
                      <label class="custom-control-label" for="switch_roles">Disqualify Heroes in following <b>Roles</b></label>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <MultiSelect v-model="flagged_roles" :options="roles" :filter="true" placeholder="Select Roles"  />
                  </div>
                </div>
                <br /><br /><br />
                <div class="row">
                  <div class="col-xl-6">
                    <div class="custom-control custom-switch ">
                      <input type="checkbox" class="custom-control-input" id="switch_winrate" v-model="switch_winrate">
                      <label class="custom-control-label" for="switch_winrate">Disqualify Heroes outside <b>Win Rate</b> range</label>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <range-slider v-model="range_winrate" :type="1" suffix="%" :min="30" :max="70"></range-slider>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-6">
                    <div class="custom-control custom-switch ">
                      <input type="checkbox" class="custom-control-input" id="switch_dmg" v-model="switch_dmg">
                      <label class="custom-control-label" for="switch_dmg">Disqualify Heroes outside <b>Base Damage</b> range</label>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <range-slider v-model="range_dmg" :type="3" :min="min_dmg" :max="max_dmg"></range-slider>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-xl-7">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="switch_str" v-model="switch_str">
                      <label class="custom-control-label" for="switch_str">Disqualify Strength Heroes</label>
                    </div>
                  </div>
                </div>
                 <div class="row">
                  <div class="col-xl-7">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="switch_int" v-model="switch_int">
                      <label class="custom-control-label" for="switch_int">Disqualify Intelligence Heroes</label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-7">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="switch_agi" v-model="switch_agi">
                      <label class="custom-control-label" for="switch_agi">Disqualify Agility Heroes</label>
                    </div>
                  </div>
                </div>
                <br />
                <div class="row" v-if="!switch_str">
                  <div class="col-xl-6">
                    <div class="custom-control custom-switch ">
                      <input type="checkbox" class="custom-control-input" id="switch_gain_str_range" v-model="switch_gain_str_range">
                      <label class="custom-control-label" for="switch_gain_str_range">Disqualify Heroes outside <b>Strength Gain</b> range</label>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <range-slider v-model="range_gain_str" :type="2" :min="min_gain_str" :max="max_gain_str"></range-slider>
                  </div>
                </div>
                <div class="row" v-if="!switch_str">
                  <div class="col-xl-6">
                    <div class="custom-control custom-switch ">
                      <input type="checkbox" class="custom-control-input" id="switch_max_str_range" v-model="switch_max_str_range">
                      <label class="custom-control-label" for="switch_max_str_range">Disqualify Heroes outside <b>Max Strength</b> range</label>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <range-slider v-model="range_max_str" :type="3" :min="min_str" :max="max_str"></range-slider>
                  </div>
                </div>
                <br />
                <div class="row" v-if="!switch_int">
                  <div class="col-xl-6">
                    <div class="custom-control custom-switch ">
                      <input type="checkbox" class="custom-control-input" id="switch_gain_int_range" v-model="switch_gain_int_range">
                      <label class="custom-control-label" for="switch_gain_int_range">Disqualify Heroes outside <b>Intelligence Gain</b> range</label>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <range-slider v-model="range_gain_int" :type="2" :min="min_gain_int" :max="max_gain_int"></range-slider>
                  </div>
                </div>
                <div class="row" v-if="!switch_int">
                  <div class="col-xl-6">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="switch_max_int_range" v-model="switch_max_int_range">
                      <label class="custom-control-label" for="switch_max_int_range">Disqualify Heroes outside <b>Max Intelligence</b> range</label>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <range-slider v-model="range_max_int" :type="3" :min="min_int" :max="max_int"></range-slider>
                  </div>
                </div>
                <br />
                <div class="row" v-if="!switch_agi">
                  <div class="col-xl-6">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="switch_gain_agi_range" v-model="switch_gain_agi_range">
                      <label class="custom-control-label" for="switch_gain_agi_range">Disqualify Heroes outside this <b>Agility Gain</b> range</label>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <range-slider v-model="range_gain_agi" :type="2" :min="min_gain_agi" :max="max_gain_agi"></range-slider>
                  </div>
                </div>
                <div class="row" v-if="!switch_agi">
                  <div class="col-xl-6">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="switch_max_int_range" v-model="switch_max_agi_range">
                      <label class="custom-control-label" for="switch_max_int_range">Disqualify Heroes outside <b>Max Agility</b> range</label>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <range-slider v-model="range_max_agi" :type="3" :min="min_agi" :max="max_agi"></range-slider>
                  </div>
                </div>
              </div>
              <hr />
              <h5 class="text-center">Balance Teams</h5>
              <hr />
              <div>
                <span>Ensure that there is at least one each type of primary attribute on each Team:</span>
                <div class="custom-control custom-switch" v-if="!switch_str">
                  <input type="checkbox" class="custom-control-input" id="switch_attribute_str" v-model="switch_attribute_str">
                  <label class="custom-control-label" for="switch_attribute_str">Strength</label>
                </div>
                <div class="custom-control custom-switch" v-if="!switch_int">
                  <input type="checkbox" class="custom-control-input" id="switch_attribute_int" v-model="switch_attribute_int">
                  <label class="custom-control-label" for="switch_attribute_int">Intelligence</label>
                </div>
                <div class="custom-control custom-switch" v-if="!switch_agi">
                  <input type="checkbox" class="custom-control-input" id="switch_attribute_agi" v-model="switch_attribute_agi">
                  <label class="custom-control-label" for="switch_attribute_agi">Agility</label>
                </div>
                <br />
                <span>Ensure that there is at least one each type of attack capabilities on each Team:</span>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="switch_attack_melee" v-model="switch_attack_melee">
                  <label class="custom-control-label" for="switch_attack_melee">Melee</label>
                </div>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="switch_attack_ranged" v-model="switch_attack_ranged">
                  <label class="custom-control-label" for="switch_attack_ranged">Ranged</label>
                </div>
                <br />
                <span>Ensure that there is equal number of Heroes:</span>
                <div class="custom-control custom-switch" >
                  <input type="checkbox" class="custom-control-input" id="switch_equal_primary" v-model="switch_equal_primary">
                  <label class="custom-control-label" for="switch_equal_primary">That share a <span title="Strength/Intelligence/Agility">primary attribute</span></label>
                </div>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="switch_equal_attack" v-model="switch_equal_attack">
                  <label class="custom-control-label" for="switch_equal_attack">That share an <span title="Melee/Ranged">attack capability</span></label>
                </div>
              </div>
              <hr />
              <h5 class="text-center">Order Roster</h5>
              <hr />
              <div>
                <span>Order each teams heroes by:</span>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="roster_order" id="roster_order_random" :value="0" v-model="roster_order">
                  <label class="form-check-label" for="roster_order_random">
                    Random
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="roster_order" id="roster_order_winrate" :value="1" v-model="roster_order">
                  <label class="form-check-label" for="roster_order_winrate" title="Ascending Win Rate">
                    Weaker Heroes First
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="roster_order" id="roster_order_winrate" :value="2" v-model="roster_order">
                  <label class="form-check-label" for="roster_order_winrate" title="Descending Win Rate">
                    Stronger Heroes First
                  </label>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-success" @click="generate">Generate</button>
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
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_shuffle_player" v-model="shuffle_player">
                    <label class="custom-control-label" for="switch_shuffle_player">Disable Player Shuffle</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_per_player_time" v-model="switch_per_player_time">
                    <label class="custom-control-label" for="switch_per_player_time">Override total time in seconds a player has to draft an ability</label>
                  </div>
                </div>
                <div class="col-xl-6">
                   <single-slider v-model="per_player_time" :min="1" :max="10"></single-slider>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_pre_round_time" v-model="switch_pre_round_time">
                    <label class="custom-control-label" for="switch_pre_round_time">Override total time in seconds for break between rounds</label>
                  </div>
                </div>
                <div class="col-xl-6">
                  <single-slider v-model="pre_round_time"  :min="1" :max="30"></single-slider>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_pre_time" v-model="switch_pre_time">
                    <label class="custom-control-label" for="switch_pre_time">Override total time in seconds before the draft starts.</label>
                  </div>
                </div>
                <div class="col-xl-6">
                  <single-slider v-model="pre_time" :min="10" :max="120"></single-slider>
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
      <!-- Manual Ordering Roster -->
      <div class="row" v-if="generated">
         <div class="col-xl-12">
           <div class="card">
            <div class="card-header">
              <h5>Roster</h5>
            </div>
            <div class="card-body text-center">
               <div class="row">
                 <div class="col-xl-5">
                   <h5>Radiant</h5>
                   <div v-if="roster_radiant.length == 0">
                      <img src="@/assets/random.jpg" class="image" title="Random"/>
                      <img src="@/assets/random.jpg" class="image" title="Random"/>
                      <img src="@/assets/random.jpg" class="image" title="Random"/>
                      <img src="@/assets/random.jpg" class="image" title="Random"/>
                      <img src="@/assets/random.jpg" class="image" title="Random"/>
                   </div>
                   <div v-else>
                    <template v-for="(hero) in roster_radiant" v-bind:key="hero.id">
                      <img :src="hero.image_banner" class="image" :title="hero.name" />
                    </template>
                   </div>
                 </div>
                 <div class="col-xl-5">
                   <h5>Dire</h5>
                   <div v-if="roster_dire.length == 0">
                      <img src="@/assets/random.jpg" class="image" title="Random"/>
                      <img src="@/assets/random.jpg" class="image" title="Random"/>
                      <img src="@/assets/random.jpg" class="image" title="Random"/>
                      <img src="@/assets/random.jpg" class="image" title="Random"/>
                      <img src="@/assets/random.jpg" class="image" title="Random"/>
                   </div>
                   <div v-else>
                    <template v-for="(hero) in roster_dire" v-bind:key="hero.id">
                        <img :src="hero.image_banner" class="image" :title="hero.name"/>
                    </template>
                   </div>
                 </div>
                 <div class="col-xl-2">
                  <h5>Extra</h5>
                  <div v-if="roster_extra.length == 0">
                    <img src="@/assets/random.jpg" class="image" title="Random"/>
                    <img src="@/assets/random.jpg" class="image" title="Random"/>
                  </div>
                  <div v-else>
                    <template v-for="(hero) in roster_extra" v-bind:key="hero.id">
                      <img :src="hero.image_banner" class="image" :title="hero.name"/>
                    </template>
                  </div>
                 </div>
               </div>
            </div>
           </div>
         </div>
      </div>
      <br />
      <Commands v-if="generated" :options="options" ></Commands>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import data from '@/data/heroes.json'
import MultiSelect from 'primevue/multiselect';
import RangeSlider from '@/components/RangeSlider.vue'
import SingleSlider from '@/components/SingleSlider.vue'
import Commands from '@/components/Commands.vue'

export default {
  components: {
    RangeSlider, SingleSlider, MultiSelect, Commands
  },
  data() {
    let sg = data.map(_ => _.strength_gain);
    let smax = data.map(_ => _.max_strength);
    let ig = data.map(_ => _.intelligence_gain);
    let imax = data.map(_ => _.max_intelligence);
    let ag = data.map(_ => _.agility_gain);
    let amax = data.map(_ => _.max_agility);
    let dmg = data.map(_ => _.damage)
    let roles = data.map(_ => _.roles).reduce((acc,currentValue,index, array) => {
        for (const item of currentValue) {
          if(array.indexOf(item)!=index && !acc.includes(item)) 
            acc.push(item);
        }
        return acc;
      }, []);

    return {
      heroes: data,
      roles: roles,
      generated: false,
      roster_radiant: [],
      roster_dire: [],
      roster_extra: [],

      switch_random_radiant: false,
      switch_random_dire: false,
      switch_random_extras: false,
      
      switch_winrate: false,
      range_winrate: [45, 55],

      switch_dmg: false,
      min_dmg: Math.min(...dmg),
      max_dmg: Math.max(...dmg),
      range_dmg: [Math.min(...dmg),Math.max(...dmg)],

      switch_roles: false,
      flagged_roles: [],

      switch_str: false,
      max_gain_str: Math.max(...sg),
      min_gain_str:  Math.min(...sg),
      min_str: Math.min(...smax),
      max_str: Math.max(...smax),
      switch_gain_str_range: false,
      range_gain_str: [Math.min(...sg), Math.max(...sg)],
      switch_max_str_range: false,
      range_max_str: [Math.min(...smax),  Math.max(...smax)],

      switch_int: false,
      max_gain_int:  Math.max(...ig),
      min_gain_int: Math.min(...ig),
      min_int: Math.min(...imax),
      max_int: Math.max(...imax),
      switch_gain_int_range: false,
      range_gain_int: [Math.min(...ig), Math.max(...ig)],
      switch_max_int_range: false,
      range_max_int: [Math.min(...imax), Math.max(...imax)],

      switch_agi: false,
      max_gain_agi: Math.max(...ag),
      min_gain_agi: Math.min(...ag),
      min_agi: Math.min(...amax),
      max_agi: Math.max(...amax),
      switch_gain_agi_range: false,
      range_gain_agi: [Math.min(...ag), Math.max(...ag)],
      switch_max_agi_range: false,
      range_max_agi: [Math.min(...amax), Math.max(...amax)],

      switch_equal_primary: false,
      switch_equal_attack: false,      
      switch_attribute_str: false, 
      switch_attribute_int: false,
      switch_attribute_agi: false,
      switch_attack_melee: false,
      switch_attack_ranged: false,

      roster_order: 0,

      shuffle_player: false,
      switch_per_player_time: false,
      per_player_time: 7,     // dota_gamemode_ability_draft_per_player_time
      switch_pre_round_time: false,
      pre_round_time: 5,      // dota_gamemode_ability_draft_pre_round_time
      switch_pre_time: false,
      pre_time: 60,           // dota_gamemode_ability_draft_pre_time
    }
  },
  computed: {
    options: function () {
      return {
        roster_radiant: this.roster_radiant,
        roster_dire: this.roster_dire,
        roster_extra: this.roster_extra,
        shuffle_player: this.shuffle_player,
        switch_per_player_time: this.switch_per_player_time,
        per_player_time: this.per_player_time,
        switch_pre_round_time: this.switch_pre_round_time,
        pre_round_time: this.pre_round_time,
        switch_pre_time: this.switch_pre_time,
        pre_time: this.pre_time,
      };
    },
    /*
    commands: function() {
      let cmd = "dota_gamemode_ability_draft_set_draft_hero_and_team_clear \n";

      if(this.shuffle_player) {
        cmd += "dota_gamemode_ability_draft_shuffle_draft_order 0 \n"
      }

      if(this.switch_per_player_time) {
        cmd += "dota_gamemode_ability_draft_per_player_time " + this.per_player_time + " \n"
      }
      if(this.switch_pre_round_time) {
        cmd += "dota_gamemode_ability_draft_pre_round_time " + this.pre_round_time + " \n"
      }
      if(this.switch_pre_time) {
        cmd += "dota_gamemode_ability_draft_pre_time " + this.pre_time + " \n"
      }
      for (const item of this.roster_radiant) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " radiant \n"
      }
      for (const item of this.roster_dire) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " dire \n"
      }
      for (const item of this.roster_extra) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " extra \n"
      }

      cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team"

      return cmd;
    },
    launchOptions: function() {
      let cmd = "-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear ";

      if(this.shuffle_player) {
        cmd += "+dota_gamemode_ability_draft_shuffle_draft_order 0 ";
      }

      if(this.switch_per_player_time) {
        cmd += "+dota_gamemode_ability_draft_per_player_time " + this.per_player_time + " "
      }
      if(this.switch_pre_round_time) {
        cmd += "+dota_gamemode_ability_draft_pre_round_time " + this.pre_round_time + " "
      }
      if(this.switch_pre_time) {
        cmd += "+dota_gamemode_ability_draft_pre_time " + this.pre_time + " "
      }

      for (const item of this.roster_radiant) {
        cmd += "+dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " radiant "
      }
      for (const item of this.roster_dire) {
        cmd += "+dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " dire "
      }
      for (const item of this.roster_extra) {
        cmd += "+dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " extra "
      }
      return cmd;
    }
    */
  },
  methods: {
    generate() {
      this.generated = false;
      this.roster_radiant = [];
      this.roster_dire = [];
      this.roster_extra = [];

      let collection = this.getHeroes();
      let pool_size = this.getPoolSize();
      if(collection.length < pool_size) {
        alert("Failure to generate a pool, Not enough heroes left in the pool.");
        return;
      }

      let i = 0;
      var limit = 1000;
      for (; i <= limit; i++) {
        let teams = this.getTeams(collection);
        let radiant = teams[0];
        let dire = teams[1];
        let extra = teams[2];
        if(this.checkTeams(radiant, dire, extra)) {
          continue;
        } else {
          this.roster_radiant = radiant;
          this.roster_dire = dire;
          this.roster_extra = extra;
          break;
        }
      }
      if(i == limit) {
        alert("Failure to generate a pool, Please try again.");
        return;
      }

      this.generated = true;
    },
    getPoolSize() {
      let pool_size = 12;
      if(this.switch_random_extras) {
        pool_size -= 2;
      }
      if(this.switch_random_radiant) {
        pool_size -= 5;
      }
      if(this.switch_random_dire) {
        pool_size -= 5;
      }
      return pool_size;
    },
    getHeroes() {
      let collection = this.heroes;

      if(this.switch_str) {
        collection = collection.filter(_ => _.primary_attribute != "STRENGTH");
      }
      if(this.switch_int) {
         collection = collection.filter(_ => _.primary_attribute != "INTELLECT");
      }
      if(this.switch_agi) {
        collection = collection.filter(_ => _.primary_attribute != "AGILITY");
      }

      if(this.switch_roles) {
        for (const role of this.flagged_roles) {
          collection = collection.filter(_ => !_.roles.includes(role));
        }
      }

      if(this.switch_winrate) {
        let low = this.range_winrate[0] / 100;
        let hi = this.range_winrate[1] / 100;
        collection = collection.filter(_ => _.win_rate >= low && _.win_rate <= hi);
      }

      if(this.switch_dmg) {
        let low = this.range_dmg[0];
        let hi = this.range_dmg[1];
        collection = collection.filter(_ => _.damage >= low && _.damage <= hi);
      }

      if(this.switch_gain_str_range) {
        let low = this.range_gain_str[0];
        let hi = this.range_gain_str[1];
        collection = collection.filter(_ => _.strength_gain >= low && _.strength_gain <= hi);
      }

      if(this.switch_max_str_range) {
        let low = this.range_max_str[0];
        let hi = this.range_max_str[1];
        collection = collection.filter(_ => _.max_strength >= low && _.max_strength <= hi);
      }

      if(this.switch_gain_int_range) {
        let low = this.range_gain_int[0];
        let hi = this.range_gain_int[1];
        collection = collection.filter(_ => _.intelligence_gain >= low && _.intelligence_gain <= hi);
      }

      if(this.switch_max_int_range) {
        let low = this.range_max_int[0];
        let hi = this.range_max_int[1];
        collection = collection.filter(_ => _.max_intelligence >= low && _.max_intelligence <= hi);
      }

      if(this.switch_gain_agi_range) {
        let low = this.range_gain_agi[0];
        let hi = this.range_gain_agi[1];
        collection = collection.filter(_ => _.agility_gain >= low && _.agility_gain <= hi);
      }

      if(this.switch_max_agi_range) {
        let low = this.range_max_agi[0];
        let hi = this.range_max_agi[1];
        collection = collection.filter(_ => _.max_agility >= low && _.max_agility <= hi);
      }

      return collection;
    },
    sortByWinRate(lhs, rhs) {
      if(this.roster_order == 1) {
        return lhs.win_rate - rhs.win_rate;
      } else if(this.roster_order == 2) {
        return rhs.win_rate - lhs.win_rate;
      }
    },
    getTeams(collection) {
        let radiant = [];
        let dire = [];
        let extra = [];
        if(this.switch_random_radiant == false) {
          for (let i = 0; i < 5; i++) {
            var index = Math.floor((Math.random() * collection.length));
            var item = collection[index];
            radiant.push(item);
          }
          if(this.roster_order != 0) {
            radiant.sort(this.sortByWinRate);
          }
        }
        if(this.switch_random_dire == false) {
          for (let i = 0; i < 5; i++) {
            var index = Math.floor((Math.random() * collection.length));
            var item = collection[index];
            dire.push(item);
          }
          if(this.roster_order != 0) {
            dire.sort(this.sortByWinRate);
          }
        }
        if(this.switch_random_extras == false) {
          for (let i = 0; i < 2; i++) {
            var index = Math.floor((Math.random() * collection.length));
            var item = collection[index];
            extra.push(item);
          }    
        }
        return [radiant,dire,extra];
    },
    checkTeams(radiant,dire,extra) {
      var pool = radiant.concat(dire).concat(extra);
      if(pool.filter(_ => _.ability_replace_required).length > 1)
        return true;

      var identities = pool.map(_ => _.id);
      let duplicate = identities.reduce((acc,currentValue,index, array) => {
        if(array.indexOf(currentValue)!=index && !acc.includes(currentValue)) 
          acc.push(currentValue);
        return acc;
      }, []);
      if(duplicate.length > 0)
        return true;

      var r_ranged = radiant.filter(_ => _.attack_capabilities == "RANGED").length;
      var r_melee = radiant.filter(_ => _.attack_capabilities == "MELEE").length;
      var d_ranged = dire.filter(_ => _.attack_capabilities == "RANGED").length;
      var d_melee = dire.filter(_ => _.attack_capabilities == "MELEE").length;
      var r_str = radiant.filter(_ => _.primary_attribute == "STRENGTH").length;
      var d_str = dire.filter(_ => _.primary_attribute == "STRENGTH").length;
      var r_agi = radiant.filter(_ => _.primary_attribute == "AGILITY").length;
      var d_agi = dire.filter(_ => _.primary_attribute == "AGILITY").length;
      var r_int = radiant.filter(_ => _.primary_attribute == "INTELLECT").length;
      var d_int = dire.filter(_ => _.primary_attribute == "INTELLECT").length;

      if(this.switch_equal_attack) {
        if(r_ranged != d_ranged)
          return true;
        if(r_melee != d_melee)
          return true;
      }

      if(this.switch_equal_primary) {
        if(r_str != d_str)
          return true;
        if(r_agi != d_agi)
          return true;
        if(r_int != d_int)
          return true;
      }

      if(this.switch_attribute_str) {
        if(r_str == 0 || d_str == 0)
          return true;
      }
      if(this.switch_attribute_int) {
        if(r_int == 0 || d_int == 0)
          return true;
      }
      if(this.switch_attribute_agi) {
        if(r_agi == 0 || d_agi == 0)
          return true;
      }

      if(this.switch_attack_melee) {
        if(r_melee == 0 || d_melee == 0)
          return true;
      }
      if(this.switch_attack_ranged) {
          if(r_ranged == 0 || d_ranged == 0)
          return true;
      }

      return false;
    },
    /*
    launch() {
      let cmd = this.launchOptions;
      let params = encodeURIComponent(cmd);
      let url = "steam://run/570//" + params;
      window.open(url);
    },
    copy() {
      let cmd = this.commands;
      navigator.clipboard.writeText(cmd);
    }
    */
  }
};
</script>

<style scoped>
.admin {
  padding: 4em 0 6em 0;
  text-align: left;
}
.image {
  padding: 2px;
  width: 70px;
  height: 40px;
}
.p-multiselect {
    width: 100%;
}
</style>

