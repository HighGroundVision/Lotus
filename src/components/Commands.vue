<template>
  <div class="row">
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
            You can use the 'Copy Roster' button to copy the console commands so you can paste them into the Dota Console.
            Also if you don't know what the console is, you can use the 'Set Roster' button to start Dota directly and the console commands will be set for you via the Steam Launch Option<br /> 
          </p>
          <button type="button" class="btn btn-primary" @click="copy">Copy Roster</button>
          <button type="button" class="btn btn-primary  m-1" @click="launch">Set Roster</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Commands",
  data() {
    return {}
  },
  props: {
    options: Object,
  },
  computed: {
    roster_radiant: function() {
      return this.options.roster_radiant ?? [];
    },
    roster_dire: function() {
      return this.options.roster_dire ?? [];
    },
    roster_extra: function() {
      return this.options.roster_extra ?? [];
    },
    shuffle_player: function() {
      return this.options.shuffle_player ?? false;
    },
    switch_per_player_time: function() {
      return this.options.switch_per_player_time ?? false;
    },
    per_player_time: function() {
      return this.options.per_player_time ?? 7;
    },
    switch_pre_round_time: function() {
      return this.options.switch_pre_round_time ?? false;
    },
    pre_round_time: function() {
      return this.options.pre_round_time ?? 5;
    },
    switch_pre_time: function() {
      return this.options.switch_pre_time ?? false;
    },
    pre_time: function() {
      return this.options.pre_time ?? 60;
    },
    commands: function() {
      let cmd = "dota_gamemode_ability_draft_set_draft_hero_and_team_clear;\n";

      if(this.shuffle_player) {
        cmd += "dota_gamemode_ability_draft_shuffle_draft_order 0;\n"
      }

      if(this.switch_per_player_time) {
        cmd += "dota_gamemode_ability_draft_per_player_time " + this.per_player_time + ";\n"
      }
      if(this.switch_pre_round_time) {
        cmd += "dota_gamemode_ability_draft_pre_round_time " + this.pre_round_time + ";\n"
      }
      if(this.switch_pre_time) {
        cmd += "dota_gamemode_ability_draft_pre_time " + this.pre_time + ";\n"
      }

      for (const item of this.roster_radiant) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " radiant;\n"
      }
      for (const item of this.roster_dire) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " dire;\n"
      }
      for (const item of this.roster_extra) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " extra;\n"
      }

      cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team;\n"
      
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
    launch() {  
      let cmd = this.launchOptions;
      let params = encodeURIComponent(cmd);
      let url = "steam://run/570//" + params;
      window.open(url);
    },
    copy() {
      let cmd = this.commands;
      navigator.clipboard.writeText(cmd);
    },
  }
};
</script>

<style scoped>
</style>