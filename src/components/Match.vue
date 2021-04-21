<template>
  
  <div class="card mb-3">
    <div class="card-header">
      
      <span>Match {{(index+1)}}</span>
    </div>
    <div class="card-body">
     
    </div>
    <div class="card-footer">
     <button type="button" class="btn btn-danger btn-sm float-right" @click="remove">Remove</button>
    </div>
  </div>
</template>

<script>
//import data from '@/data/heroes.json';
//import axios from 'axios';

export default {
  name: "Match",
  data() {
    return {};
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    match: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    }
  },
  computed: {
    bans() {
      return Array.from(Array(this.options.ban_steps).keys());
    },
    commands() {
      let cmd = "dota_gamemode_ability_draft_set_draft_hero_and_team_clear \n";

      if(this.options.shuffle_player) {
        cmd += "dota_gamemode_ability_draft_shuffle_draft_order 0 \n"
      }
      if(this.options.switch_per_player_time) {
        cmd += "dota_gamemode_ability_draft_per_player_time " + this.options.per_player_time + " \n"
      }
      if(this.options.switch_pre_round_time) {
        cmd += "dota_gamemode_ability_draft_pre_round_time " + this.options.pre_round_time + " \n"
      }
      if(this.options.switch_pre_time) {
        cmd += "dota_gamemode_ability_draft_pre_time " + this.options.pre_time + " \n"
      }
      for (const item of this.match.radiant.picked) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " radiant \n"
      }
      for (const item of this.match.dire.picked) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " dire \n"
      }
      for (const item of this.match.extras) {
        cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + item.key + " extra \n"
      }

      cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team"

      return cmd;
    },
    playersReady() {
      return false;
    },
    draftReady() {
      return false;
    }
  },
  emits: ['remove'],
  methods: {
    remove() {
      this.$emit('remove', this.match.id);
    },
    start() {
      // TODO: ..
    },
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
  }
};
</script>

<style scoped>
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
.user {
  height: 50px;
  margin: 2px;
}
.user-disconnected {
  filter: invert(40%) sepia(20%) saturate(2476%) hue-rotate(320deg) brightness(100%) contrast(119%);
}
.user-connected {
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(100%) contrast(119%);
}
.user-picked {
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(200deg) brightness(100%) contrast(119%);
}
.user-waiting {
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(10deg) brightness(100%) contrast(119%);
}
</style>