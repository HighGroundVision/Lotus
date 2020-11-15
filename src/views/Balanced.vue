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
                  <input id="range1" type="range" :min="0" :max="100" step="1"  class="form-control-range" v-model="value_low_wr">
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
                  <input id="range2" type="range" :min="0" :max="100" step="1" class="form-control-range" v-model="value_high_wr">
                </div>
                <div class="col-xl-1">
                  <span>{{value_high_wr}}%</span>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch11" v-model="switch_str">
                    <label class="custom-control-label" for="switch11">Disqualify Strength Heroes</label>
                  </div>
                </div>
              </div>
              <div class="row" v-if="!switch_str">
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
              <div class="row" v-if="!switch_str">
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
              <br />
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch12" v-model="switch_int">
                    <label class="custom-control-label" for="switch12">Disqualify Intelligence Heroes</label>
                  </div>
                </div>
              </div>
              <div class="row" v-if="!switch_int">
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
              <div class="row" v-if="!switch_int">
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
              <br />
              <div class="row">
                <div class="col-xl-7">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch13" v-model="switch_agi">
                    <label class="custom-control-label" for="switch13">Disqualify Agility Heroes</label>
                  </div>
                </div>
              </div>
              <div class="row" v-if="!switch_agi">
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
              <div class="row" v-if="!switch_agi">
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
              <hr />
              <span>Ensure that there is equal number of Heroes:</span>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="switch9" v-model="switch_equal_primary">
                <label class="custom-control-label" for="switch9">That share a primary attribute (Strength/Intelligence/Agility)</label>
              </div>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="switch10" v-model="switch_equal_attack">
                <label class="custom-control-label" for="switch10">That share an attack capability (Melee/Ranged)</label>
              </div>
              <br />
              <span>Ensure that there is at least one each type of primary attribute (Strength/Intelligence/Agility) on each Team:</span>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="switch15" v-model="switch_attribute_str">
                <label class="custom-control-label" for="switch15">Strength</label>
              </div>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="switch16" v-model="switch_attribute_int">
                <label class="custom-control-label" for="switch16">Intelligence</label>
              </div>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="switch17" v-model="switch_attribute_agi">
                <label class="custom-control-label" for="switch17">Agility</label>
              </div>
              <br />
              <span>Ensure that there is at least one each type of attack capabilities (Melee/Ranged) on each Team:</span>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="switch18" v-model="switch_attack_melee">
                <label class="custom-control-label" for="switch18">Melee</label>
              </div>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="switch19" v-model="switch_attack_ranged">
                <label class="custom-control-label" for="switch19">Ranged</label>
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
            <div class="card-body text-center">
               <div class="row">
                 <div class="col-xl-6">
                   <h5>Radiant</h5>
                   <template v-for="(hero) in roster_radiant" v-bind:key="hero.id">
                     <img :src="hero.image_banner" class="image" :title="hero.primary_attribute" />
                   </template>
                 </div>
                 <div class="col-xl-6">
                   <h5>Dire</h5>
                   <template v-for="(hero) in roster_dire" v-bind:key="hero.id">
                      <img :src="hero.image_banner" class="image" :title="hero.primary_attribute"/>
                   </template>
                 </div>
               </div>
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
      value_low_wr: 45,
      switch_high_wr: false,
      value_high_wr: 55,
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
      switch_equal_primary: false,
      switch_equal_attack: false,
      switch_str: false,
      switch_attribute_str: false,
      switch_int: false,
      switch_attribute_int: false,
      switch_agi: false,
      switch_attribute_agi: false,
      switch_attack_melee: false,
      switch_attack_ranged: false,
      roster_radiant: [],
      roster_dire: [],
      //roster_extra: []
    }
  },
  computed: {
    commands: function() {
      let cmd = "dota_gamemode_ability_draft_set_draft_hero_and_team_clear \n";
      for (const item of this.roster_radiant) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " radiant \n"
      }
      for (const item of this.roster_dire) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " dire \n"
      }
      return cmd;
    },
    launchOptions: function() {
      let cmd = "-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear ";
      for (const item of this.roster_radiant) {
        cmd += "+dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " radiant "
      }
      for (const item of this.roster_dire) {
        cmd += "+dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " dire "
      }
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
      if(this.switch_str) {
        collection = collection.filter(_ => _.primary_attribute != "STRENGTH");
      } else{
        if(this.switch_low_str) {
          collection = collection.filter(_ => _.strength_gain > this.value_low_str);
        }
        if(this.switch_high_str) {
          collection = collection.filter(_ => _.strength_gain < this.value_high_str);
        }
      }
      if(this.switch_int) {
        collection = collection.filter(_ => _.primary_attribute != "INTELLECT");
      } else {
        if(this.switch_low_int) {
          collection = collection.filter(_ => _.intelligence_gain > this.value_low_int);
        }
        if(this.switch_high_int) {
          collection = collection.filter(_ => _.intelligence_gain < this.value_high_int);
        }
      }
      if(this.switch_agi) {
        collection = collection.filter(_ => _.primary_attribute != "AGILITY");
        } else {
          if(this.switch_low_agi) {
          collection = collection.filter(_ => _.agility_gain > this.value_low_agi);
        }
        if(this.switch_high_agi) {
          collection = collection.filter(_ => _.agility_gain < this.value_high_agi);
        }
      }

      if(collection.length < 10) {
        alert("Failure to generate a pool, Not enough heroes left in the pool.");
        return;
      }

      let i = 0;
      var limit = 1000;
      for (; i <= limit; i++) {
        let teams = this.getTeams(collection);
        let radiant = teams[0];
        let dire = teams[1];
        if(this.checkTeams(radiant, dire)) {
          continue;
        } else {
          this.roster_radiant = radiant;
          this.roster_dire = dire;
          break;
        }
      }
      if(i == limit) {
        alert("Failure to generate a pool, Please try again.");
        return;
      }

      this.generated = true;
    },
    getTeams(collection) {
        let radiant = [];
        let dire = [];
        for (let i = 0; i < 5; i++) {
          var index = Math.floor((Math.random() * collection.length));
          var item = collection[index];
          radiant.push(item);
        }
        for (let i = 0; i < 5; i++) {
          var index = Math.floor((Math.random() * collection.length));
          var item = collection[index];
          dire.push(item);
        }
        return [radiant,dire];
    },
    checkTeams(radiant,dire) {
      var pool = radiant.concat(dire);
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
.image {
  padding: 2px;
  width: 100px;
  height: 55px;
}
</style>
