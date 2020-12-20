<template>
  <div class="admin">
    <div class="container">
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-12">
          <div class="card" >
            <div class="card-body" >
              <h1>Host Choice</h1>
              <p class="card-text">
                A tool for admins to quickly generate the commands need to create the hero roster.
                Select the hero and the team.
                You do not have submit a complete roster the remain slots will random as normal.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
             <h5>Heroes</h5>
             <input v-model="filter" class="form-control" placeholder="Search" />
            </div>
            <div class="card-body"> <!-- style="overflow-y: scroll; height: 400px;" -->
              <template v-for="(hero) in collection" v-bind:key="hero.id">
                <div class="hero">
                  <img :src="hero.image_banner" class="image" v-bind:class="{ 'darkened-image': hero.picked }" data-toggle="modal" :data-target="'#modal-'+hero.id"/>
                  <!-- Modal -->
                  <div class="modal fade" :id="'modal-'+hero.id" tabindex="-1" role="dialog"  aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Pick Team</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <h2><img :src="hero.image_icon" /> {{hero.name}}</h2>
                          <p v-if="hero.picked">This hero is already picked.</p>
                          <p v-if="!hero.picked && hero.ability_replace_required && hasAbilityReplaceRequired">There is already a hero that requires ability replacement, only one per Ability Draft game allowed.</p>
                          <p v-if="hasFullSelection">The roster is full.</p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-success" v-if="!hero.picked && this.roster_radiant.length < 5 && (hero.ability_replace_required && this.hasAbilityReplaceRequired) == false" @click="pickRadiant(hero)">Radiant</button>
                          <button type="button" class="btn btn-danger" v-if="!hero.picked && this.roster_dire.length < 5 && (hero.ability_replace_required && this.hasAbilityReplaceRequired) == false" @click="pickDire(hero)">Dire</button>
                          <button type="button" class="btn btn-primary" v-if="!hero.picked && this.roster_extra.length < 2 && (hero.ability_replace_required && this.hasAbilityReplaceRequired) == false" @click="pickExtra(hero)">Extra</button>
                          <button type="button" class="btn btn-warning" v-if="hero.picked" @click="remove(hero)">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;">
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
      <div class="row" style="margin-bottom: 2em;" v-if="hasSelection">
         <div class="col-xl-12">
           <div class="card">
            <div class="card-header">
              <h5>Roster</h5>
            </div>
            <div class="card-body text-center">
               <div class="row">
                 <div class="col-xl-5">
                   <h5>Radiant</h5>
                   <template v-for="(hero) in roster_radiant" v-bind:key="hero.id">
                     <img :src="hero.image_banner" class="image" :title="hero.name" data-toggle="modal" :data-target="'#modal-'+hero.id" />
                   </template>
                 </div>
                 <div class="col-xl-5">
                   <h5>Dire</h5>
                   <template v-for="(hero) in roster_dire" v-bind:key="hero.id">
                      <img :src="hero.image_banner" class="image" :title="hero.name" data-toggle="modal" :data-target="'#modal-'+hero.id"/>
                   </template>
                 </div>
                 <div class="col-xl-2">
                   <h5>Extra</h5>
                   <template v-for="(hero) in roster_extra" v-bind:key="hero.id">
                      <img :src="hero.image_banner" class="image" :title="hero.name" data-toggle="modal" :data-target="'#modal-'+hero.id"/>
                   </template>
                 </div>
               </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-danger" @click="clear">Reset</button>
            </div>
           </div>
         </div>
      </div>
      
      <div class="row" style="margin-bottom: 2em;" v-if="hasSelection">
        <div class="col-xl-12">
           <div class="card" >
            <div class="card-header">
              <h5>Commands</h5>
            </div>
            <div class="card-body" >
              <pre class="card-text">{{commands}}</pre>
            </div>
            <div class="card-footer">
              <p>
                For more details about the commands see this <a href="https://www.reddit.com/r/Abilitydraft/comments/jl4vo9/hero_roaster_for_custom_lobbies/">reddit post</a>. <br />
                You can manually enter these commands in the Dota2 Console one by one.<br />
                Also, you can use the 'Set Roster' button to start Dota directly and the console commands will be set for you via the Launch Options.
              </p>
              <button type="button" class="btn btn-primary" @click="launch">Set Roster</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;" v-if="hasSelection">
        <div class="col-xl-12">
           <div class="card">
            <div class="card-header">
              <h5>Cleanup</h5>
            </div>
            <div class="card-body" >
              <pre class="card-text">dota_gamemode_ability_draft_set_draft_hero_and_team_clear</pre>
            </div>
            <div class="card-footer">
              <p>
                The roster is remembered until cleared, this is even between restarts of Dota.<br />
                So when you done remember to use the clear command.<br />
                You can also use the 'Clear Roster' button which will start dota directly and the console commands will be set for you via the Launch Options.
              </p>
              <button type="button" class="btn btn-primary" @click="cleanup">Clear Roster</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import data from '@/data/heroes.json'
import SingleSlider from '@/components/SingleSlider.vue'

export default {
  name: "Admin",
  components: {
    SingleSlider
  },
  data() {
    return {
      filter: null,
      heroes: data,
      roster_radiant: [],
      roster_dire: [],
      roster_extra: [],
      shuffle_player: false,
      switch_per_player_time: false,
      per_player_time: 7,
      switch_pre_round_time: false,
      pre_round_time: 5,
      switch_pre_time: false,
      pre_time: 60,
    }
  },
  computed: {
    collection: function () {
      let f = this.filter;
      if(f) {
        f = f.toLowerCase();
        return this.heroes.filter(_ => _.name.toLowerCase().includes(f) || _.aliases.includes(f));
      } else {
        return this.heroes;
      }
    },
    hasSelection: function() {
      return (this.roster_radiant.length + this.roster_dire.length + this.roster_extra.length) > 0;
    },
    hasFullSelection: function() {
      return (this.roster_radiant.length + this.roster_dire.length + this.roster_extra.length) == 12;
    },
    hasAbilityReplaceRequired: function() {
      return (this.roster_radiant.filter(_ => _.ability_replace_required).length + this.roster_dire.filter(_ => _.ability_replace_required).length + this.roster_extra.filter(_ => _.ability_replace_required).length) > 0;
    },
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
  },
  methods: {
    pickRadiant(hero) {
      this.pick(hero, this.roster_radiant);
    },
    pickDire(hero) {
      this.pick(hero, this.roster_dire);
    },
    pickExtra(hero) {
      this.pick(hero, this.roster_extra);
    },
    pick(hero, list) {
      hero.picked = true;
      list.push(hero);
      $(".modal").modal('hide');
    },
    remove(hero)  {
      hero.picked = false;
      this.roster_radiant = this.roster_radiant.filter(_ => _.id != hero.id);
      this.roster_dire = this.roster_dire.filter(_ => _.id != hero.id);
      this.roster_extra = this.roster_extra.filter(_ => _.id != hero.id);
      $(".modal").modal('hide');
    },
    launch() {  
      let cmd = this.launchOptions;
      let params = encodeURIComponent(cmd);
      let url = "steam://run/570//" + params;
      window.open(url);
    },
    cleanup() {
      var cmd = "-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear";
      let params = encodeURIComponent(cmd);
      let url = "steam://run/570//" + params;
      window.open(url);
    },
    clear() {
      for (const hero of this.heroes) {
        hero.picked = false;
      }
      this.roster_radiant = [];
      this.roster_dire = [];
      this.roster_extra = [];
    }
  }
};
</script>

<style scoped>
.admin {
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
</style>