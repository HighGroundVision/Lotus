<template>
  <div class="single-draft">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="card" >
            <div class="card-body" >
              <h1>Single Draft</h1>
              <p class="card-text">
                Players pick from a pool of one Strength hero, one Agility hero, and one Intelligence hero where the 3 choices are randomly picked and exclusive to that player.
                The extra heroes are random.
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
             <h5>Create Session</h5>
            </div>
            <div class="card-body">
              <div class="alert alert-warning" role="alert">
                You need set the Server Location to LOCAL HOST in the private lobby else the disabling the player shuffle will not work and the player will not get the hero that drafted.
                Also it is important for the player to select the same slot here and in the lobby or they will not get the hero they drafted.
              </div>
              <p>
                All the heroes in the session's pool will be distinct with a Strength/Agility/Intelligence for each player and only one hero could require ability replacement.
              </p>
              <p>
                After the session is created, you will need to share the link with the lobby you are hosting so they can select a hero. 
                If you are playing as well as hosting then you can will need to also select a hero in the correct slot.
                You can also select a hero for another player if they are having issues connecting or selecting.
              </p>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-success" @click="create">Create</button>
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
import { v4 as uuid } from 'uuid';
import axios from 'axios';
//import * as signalR from "@microsoft/signalr";
//import Commands from '@/components/Commands.vue'

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

function selection_invalid(slots, selection) {
  var collection = slots.map(_ => _.selection).flat();
  var requires_replacement = collection.filter(_ => _.ability_replace_required).length > 0
  for (const item of selection) {
    if(collection.includes(item)) {
      return true;
    }
    if(requires_replacement == true && item.ability_replace_required == true) {
      return true;
    }
  }
  return false;
}

export default {
  data() {
    return {
      heroes: data,
    }
  },
  computed: {
    options: function () {
      return {};
    }
  },
  methods: {
    async create() {
      let str = this.heroes.filter(_ => _.primary_attribute == "STRENGTH");
      let agi = this.heroes.filter(_ => _.primary_attribute == "AGILITY");
      let int = this.heroes.filter(_ => _.primary_attribute == "INTELLECT");
      let slots = []
      let selection = [];

      // TODO: Fix this...!

      for (let i = 0; i < 10; i++) {  
        selection = [];
        do {
          selection = [];
          selection.push(str.random());
          selection.push(agi.random());
          selection.push(int.random());
        } while(selection_invalid(slots, selection));

        slots.push({
          slot: i,
          name: "",
          selection: selection,
          choice: null,
          state: 0,
        });
      }
      
      let body = {
        slots: slots,
        ready: false,
        switch_show_selection_team: false,
        switch_show_choice: false,
      };
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/`;
      let response = await axios.post(url, body);
      this.$router.push(`/single-draft/host/${response.data.id}`);
    }
  }
};
</script>

<style scoped>
.single-draft {
  padding: 4em 0 6em 0;
  text-align: left;
}
</style>