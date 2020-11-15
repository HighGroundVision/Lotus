<template>
  <div class="admin">
    <div class="container">
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-12">
          <div class="card" >
            <div class="card-body" >
              <h1>Balanced Draft</h1>
              <p class="card-text">
                The draft is still randomly generated but a number of additional rules are added to ensure balanced heroes on each side. The extra heroes are random.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
             <h5>Switches</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch ">
                    <input type="checkbox" class="custom-control-input" id="switch1" v-model="switch_low_wr">
                    <label class="custom-control-label" for="switch1">Disqualify Heroes Below this WinRate</label>
                  </div>
                </div>
                <div class="col-xl-4">
                  <input id="range1" type="range" class="form-control-range" v-model="value_low_wr">
                </div>
                <div class="col-xl-1">
                  <span>{{value_low_wr}}%</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch2" v-model="switch_high_wr">
                    <label class="custom-control-label" for="switch2">Disqualify Heroes Above this WinRate</label>
                  </div>
                </div>
                <div class="col-xl-4">
                  <input id="range2" type="range" class="form-control-range" v-model="value_high_wr">
                </div>
                <div class="col-xl-1">
                  <span>{{value_high_wr}}%</span>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch3" v-model="switch_low_str">
                    <label class="custom-control-label" for="switch3">Disqualify Heroes Below this Strength Gain</label>
                  </div>
                </div>
                <div class="col-xl-4">
                  <input id="range2" type="range" :min="min_str" :max="max_str" step="0.1" class="form-control-range" v-model="value_low_str">
                </div>
                <div class="col-xl-1">
                  <span>{{value_low_str}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch4" v-model="switch_high_str">
                    <label class="custom-control-label" for="switch4">Disqualify Heroes Above this Strength Gain</label>
                  </div>
                </div>
                <div class="col-xl-4">
                  <input id="range2" type="range" :min="min_str" :max="max_str" step="0.1" class="form-control-range" v-model="value_high_str">
                </div>
                <div class="col-xl-1">
                  <span>{{value_high_str}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch5" v-model="switch_low_int">
                    <label class="custom-control-label" for="switch5">Disqualify Heroes Below this Intelligence Gain</label>
                  </div>
                </div>
                <div class="col-xl-4">
                  <input id="range2" type="range" :min="min_int" :max="max_int" step="0.1" class="form-control-range" v-model="value_low_int">
                </div>
                <div class="col-xl-1">
                  <span>{{value_low_int}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch6" v-model="switch_high_int">
                    <label class="custom-control-label" for="switch6">Disqualify Heroes Above this Intelligence Gain</label>
                  </div>
                </div>
                <div class="col-xl-4">
                  <input id="range2" type="range" :min="min_int" :max="max_int" step="0.1" class="form-control-range" v-model="value_high_int">
                </div>
                <div class="col-xl-1">
                  <span>{{value_high_int}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch7" v-model="switch_low_agi">
                    <label class="custom-control-label" for="switch7">Disqualify Heroes Below this Agility Gain</label>
                  </div>
                </div>
                <div class="col-xl-4">
                  <input id="range2" type="range" :min="min_agi" :max="max_agi" step="0.1" class="form-control-range" v-model="value_low_agi">
                </div>
                <div class="col-xl-1">
                  <span>{{value_low_agi}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch8" v-model="switch_high_agi">
                    <label class="custom-control-label" for="switch8">Disqualify Heroes Above this Agility Gain</label>
                  </div>
                </div>
                <div class="col-xl-4">
                  <input id="range2" type="range" :min="min_agi" :max="max_agi" step="0.1" class="form-control-range" v-model="value_high_agi">
                </div>
                <div class="col-xl-1">
                  <span>{{value_high_agi}}</span>
                </div>
              </div>
              <br />
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="switch9" v-model="switch_primary_attribute">
                <label class="custom-control-label" for="switch9">Balance teams around primary attribute</label>
              </div>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="switch10" v-model="switch_attack_capabilities">
                <label class="custom-control-label" for="switch10">Balance teams around attack capabilities</label>
              </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-success" @click="generate">Generate</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;" v-if="generated">
         <div class="col-xl-12">
           <div class="card">
            <div class="card-header">
              <h5>Roster</h5>
            </div>
            <div class="card-body" >
            </div>
           </div>
         </div>
      </div>
      <div class="row" style="margin-bottom: 2em;" v-if="generated">
        <div class="col-xl-12">
           <div class="card">
            <div class="card-header">
              <h5>Commands</h5>
            </div>
            <div class="card-body" >
              <pre class="card-text">{{commands}}</pre>
            </div>
            <div class="card-footer">
              <p>
                For more details about commands see this <a href="https://www.reddit.com/r/Abilitydraft/comments/jl4vo9/hero_roaster_for_custom_lobbies/">reddit post</a>. <br />
                You can manually enter these commands in the Dota2 Console one by one. OR<br />
                You can also start Dota directly and the console commands will be set for you via the Launch Options.
              </p>
              <button type="button" class="btn btn-primary" @click="launch">Launch Dota</button>
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

export default {
  name: "Admin",
  data() {
    let sg = data.map(_ => _.strength_gain);
    let ig = data.map(_ => _.intelligence_gain);
    let ag = data.map(_ => _.agility_gain);

    return {
      heroes: data,
      generated: false,
      switch_low_wr: false,
      value_low_wr: 5,
      switch_high_wr: false,
      value_high_wr: 95,
      max_str: Math.max(...sg),
      min_str:  Math.min(...sg),
      switch_low_str: false,
      value_low_str: 2.0,
      switch_high_str: false,
      value_high_str: 4.0,
      max_int:  Math.max(...ig),
      min_int: Math.min(...ig),
      switch_low_int: false,
      value_low_int: 2.0,
      switch_high_int: false,
      value_high_int: 4.0,
      max_agi: Math.max(...ag),
      min_agi: Math.min(...ag),
      switch_low_agi: false,
      value_low_agi: 1.0,
      switch_high_agi: false,
      value_high_agi: 4.0,
      switch_primary_attribute: false,
      switch_attack_capabilities: false,
    }
  },
  computed: {
    commands: function() {
      let cmd = "dota_gamemode_ability_draft_set_draft_hero_and_team_clear \n";
      cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team \n";
      return cmd;
    }
  },
  methods: {
    generate() {     
      let collection = this.heroes;
      if(this.switch_low_wr) {
        let amount = this.value_low_wr /100;
        collection = collection.filter(_ => _.win_rate > amount);
      }
      if(this.switch_high_wr) {
        let amount = this.value_high_wr / 100;
        collection = collection.filter(_ => _.win_rate < amount);
      }
      if(this.switch_low_str) {
        collection = collection.filter(_ => _.strength_gain > this.value_low_str);
      }
      if(this.switch_high_str) {
        collection = collection.filter(_ => _.strength_gain < this.value_high_str);
      }
      if(this.switch_low_int) {
        collection = collection.filter(_ => _.strength_gain > this.value_low_int);
      }
      if(this.switch_high_int) {
        collection = collection.filter(_ => _.strength_gain < this.value_high_int);
      }
      if(this.switch_low_agi) {
        collection = collection.filter(_ => _.strength_gain > this.value_low_agi);
      }
      if(this.switch_high_agi) {
        collection = collection.filter(_ => _.strength_gain < this.value_high_agi);
      }

      if(collection.length < 10)
        return;

      let pool = [];
      let i = 0;
      var limit = 1000;
      for (; i <= limit; i++) {
        pool = this.getPool(collection);

        if(this.checkPool(pool)) {
          continue;
        }

        let radiant = [];
        let dire = [];
        
        break;
      }

      // this.switch_primary_attribute, this.switch_attack_capabilities

      if(i == limit) {
        alert("Failure to generate a pool, Please try again.");
        return;
      }

     
      
      console.log("Pool", pool);

      this.generated = true;
    },
    getPool(collection) {
        let pool = [];
        for (let i = 0; i < 10; i++) {
          var index = Math.floor((Math.random() * collection.length));
          var item = collection[index];
          pool.push(item);
        }
        return pool;
    },
    checkPool(pool) {
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

      return false;
    },
    launch() {
      let cmd = this.launchOptions;
      let params = encodeURIComponent(cmd);
      let url = "steam://run/570//" + params;
      window.open(url);
      //var data = this.commands;
      //var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
      //saveAs(blob, "autoexec.cfg");
    }
  },
  async mounted() {
    /*
    var url = process.env.VUE_APP_SERVER_URL + '/api/heroes';
    var response = await this.axios.get(url);
    this.heroes = response.data;
    let sg = this.heroes.map(_ => _.strength_gain);
    this.max_str = Math.max(...sg);
    this.min_str = Math.min(...sg);
    let ig = this.heroes.map(_ => _.intelligence_gain);
    this.max_int = Math.max(...ig);
    this.min_int = Math.min(...ig);
    let ag = this.heroes.map(_ => _.agility_gain);
    this.max_agi = Math.max(...ag);
    this.min_agi = Math.min(...ag);
    */
  }
};
</script>

<style>
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
</style>