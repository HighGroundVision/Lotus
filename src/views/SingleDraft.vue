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
      <div class="row" v-if="hasNoLobby">
        <div class="col-xl-6" v-if="isNotShared">
          <div class="card">
            <div class="card-header">
             <h5>Create Session</h5>
            </div>
            <div class="card-body">
              <p>
                All the heroes in the session's pool will be distinct with a Strength/Agility/Intelligence for each player and only one hero could require ability replacement.
              </p>
              <p>
                After the session is created, you will need to share the link with the lobby you are hosting so they can select a hero. 
                If you are playing as well as hosting then you can will need to also select a hero in the correct slot.
                You can also select a hero for another player if they are having issues connecting or selecting.
              </p>
              <div class="alert alert-warning" role="alert">
                You need set the Server Location to LOCAL HOST in the private lobby else the disabling the player shuffle will not work and the player will not get the hero that drafted.
                Also it is important for the player to select the same slot here and in the lobby or they will not get the hero they drafted.
              </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-success" @click="create">Create</button>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
             <h5>Join Session</h5>
            </div>
            <div class="card-body">
              <p>
                Enter the Session Identity you received from the lobby host, click the Join button and select you slot in the lobby. 
                You also need to enter a Persona/Nickname so the host can confirm that all players are in the correct slot.
              </p>
              <input v-model="lobby_id" class="form-control m-1" placeholder="Session Identity" />
              <input v-model="name" class="form-control m-1" placeholder="Persona/Nickname" />
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary" v-bind:disabled="readyToJoin" @click="join">Join</button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row" v-if="isHost">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
             <h5>Host</h5>
            </div>
            <div class="card-body text-center">
              <div class="row">
                <div class="col-xl-12">
                  <p>
                    Below is the random roster that was generated for this session. 
                    You can share this session with your looby by clicked the Share button.
                    After which players can select the correct slot and then pick a hero.
                    When the player selects a slot the icon next to the slot <img  src="@/assets/user-disconnected.svg" class="user user-disconnected" style="width:18px;height:18px;" /> will change to <img  src="@/assets/user-connected.svg" class="user user-connected" style="width:18px;height:18px;" /> and then to <img  src="@/assets/user-star.svg" class="user user-picked" style="width:18px;height:18px;" /> when they pick.
                    You as the host can override any picks.
                  </p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-xl-6">
                  <h4 class="text-success">The Radiant</h4>
                  <template v-for="(slot, index) in slots.slice(0,5)" v-bind:key="index">
                    <div>
                      <img v-if="!selection[index] && connections[index]" src="@/assets/user-connected.svg" class="user user-connected"/>
                      <img v-if="selection[index]" src="@/assets/user-star.svg" class="user user-picked"/>
                      <img v-if="!connections[index] && !selection[index]"  src="@/assets/user-disconnected.svg" class="user user-disconnected" />
                      <template v-for="(item) in slot" v-bind:key="item.id">
                        <img v-if="selection[index] == undefined" :src="item.image_banner" class="image" @click="host_selection(index, item.key)" />
                        <img v-else :src="item.image_banner" class="image" @click="host_selection(index, item.key)" v-bind:class="{'picked': item.key == selection[index], 'discarded': item.key != selection[index]}" />
                      </template>
                    </div>
                  </template>
                </div>
                <div class="col-xl-6">
                  <h4 class="text-danger">The Dire</h4>
                  <template v-for="(slot, index) in slots.slice(5)" v-bind:key="index">
                    <div>
                      <img v-if="!selection[index+5] && connections[index+5]" src="@/assets/user-connected.svg" class="user user-connected"/>
                      <img v-if="selection[index+5]" src="@/assets/user-star.svg" class="user user-picked"/>
                      <img v-if="!connections[index+5] && !selection[index+5]"  src="@/assets/user-disconnected.svg" class="user user-disconnected" />
                      <template v-for="(item) in slot" v-bind:key="item.id">
                        <img v-if="selection[index+5] == undefined" :src="item.image_banner" class="image" @click="host_selection(index+5, item.key)" />
                        <img v-else :src="item.image_banner" class="image" @click="host_selection(index+5, item.key)" v-bind:class="{'picked': item.key == selection[index+5], 'discarded': item.key != selection[index+5]}" />
                      </template>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-sm btn-success" @click="share">Share</button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <Commands v-if="isHost" :options="options" ></Commands>

      <div class="row" v-if="isPlayer">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
             <h5>Player</h5>
            </div>
            <div class="card-body text-center">
              <div v-if="hasSlot">
                <div v-if="hasDrafted">
                  <div class="alert alert-success" role="alert">
                    Your draft has been submitted to the host!
                  </div>
                  <img :src="drafted.image_profile" class="image-large rounded" />
                </div>
                <div v-else>
                  <div class="alert alert-primary" role="alert">
                    Select a hero from the following.
                  </div>
                  <div class="row">
                    <div class="col-xl-4">
                      <h4 class="text-danger">Strength</h4>
                    </div>
                    <div class="col-xl-4">
                      <h4 class="text-success">Agility</h4>
                    </div>
                    <div class="col-xl-4">
                      <h4 class="text-primary">Intelligence</h4>
                    </div>
                  </div>
                  <div class="row">
                    <template v-for="(item) in slots[slot]" v-bind:key="item.id">
                      <div class="col-xl-4">
                        <img :src="item.image_profile" class="image-large rounded" @click="player_selection(item.key)" />
                      </div>
                    </template>
                  </div>
                </div>               
              </div>
              <div v-else>
                <div class="alert alert-warning" role="alert">
                  It is important to select the same slot in the both lobbies or you will not get the hero you drafted.
                </div>
                <div class="row">
                  <div class="col-xl-6">
                    <h4 class="text-success">The Radiant</h4>
                    <template v-for="(slot, index) in slots.slice(0,5)" v-bind:key="index">
                      <div>
                        <button type="button" class="btn btn-success btn-block m-2" @click="claim_slot(index)">Claim Radiant Slot {{index+1}}</button>
                      </div>
                    </template>
                  </div>
                  <div class="col-xl-6">
                    <h4 class="text-danger">The Dire</h4>
                    <template v-for="(slot, index) in slots.slice(5)" v-bind:key="index">
                      <div>
                        <button type="button" class="btn btn-danger btn-block m-2" @click="claim_slot(index+5)">Claim Dire Slot {{index+1}}</button>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import data from '@/data/heroes.json'
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import * as signalR from "@microsoft/signalr";
import Commands from '@/components/Commands.vue'

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

export default {
  name: "SingleDraft",
  components: {
    Commands
  },
  data() {
    return {
      heroes: data,
      has_lobby: false,
      host: false,
      name: "",
      shared: this.$route.query.session != undefined,
      lobby_id: this.$route.query.session,
      slots: [],
      connections: [false,false,false,false,false,false,false,false,false,false],
      selection: [],
      slot: null,
      drafted: null,
    }
  },
  computed: {
    options: function () {
      var self = this;
      var radiant = [0,1,2,3,4].map(i => self.heroes.find(_ => _.key == self.selection[i])).filter(x => x != undefined);
      var dire = [5,6,7,8,9].map(i => self.heroes.find(_ => _.key == self.selection[i])).filter(x => x != undefined);

      return {
        roster_radiant: radiant,
        roster_dire: dire,
        shuffle_player: true,
      };
    },
    isNotShared() {
      return !this.shared;
    },
    readyToJoin() {
      var ready = (this.lobby_id != undefined) && (this.name != "");
      return !ready;
    },
    hasNoLobby() {
      return !this.has_lobby;
    },
    isHost() {
      return this.host && this.has_lobby;
    },
    isPlayer() {
      return this.host == false &&this.has_lobby;
    },
    hasSlot() {
      return this.slot != null;
    },
    hasDrafted() {
      return this.drafted != null;
    },
    commands: function() {
      var radiant = [0,1,2,3,4]
      var dire = [5,6,7,8,9]
      
      let cmd = "dota_gamemode_ability_draft_set_draft_hero_and_team_clear \n";
      cmd += "dota_gamemode_ability_draft_shuffle_draft_order 0 \n"
      
      for (const index of radiant) {
        let key = this.selection[index];
        if(key) {
          cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + key + " radiant \n"
        }
      }

      for (const index of dire) {
        let key = this.selection[index];
        if(key) {
          cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team " + key + " dire \n"
        }
      }

      cmd += "dota_gamemode_ability_draft_set_draft_hero_and_team"
      
      return cmd;
    },
    launchOptions: function() {
      var radiant = [0,1,2,3,4]
      var dire = [5,6,7,8,9]

      let cmd = "-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear ";
      cmd += "+dota_gamemode_ability_draft_shuffle_draft_order 0 ";

      for (const index of radiant) {
        let key = this.selection[index];
        if(key) {
          cmd += "+dota_gamemode_ability_draft_set_draft_hero_and_team " + key + " radiant "
        }
      }

      for (const index of dire) {
        let key = this.selection[index];
        if(key) {
          cmd += "+dota_gamemode_ability_draft_set_draft_hero_and_team " + key + " dire "
        }
      }

      return cmd;
    }
  },
  methods: {
    create() {
      this.host = true
      this.has_lobby = true
      this.lobby_id = uuid()
      this.slots = this.generate()
      this.connect_lobby()
    },
    async join() {
      this.host = false
      this.has_lobby = true
      await this.get_lobby()
    },
    share() {
      var url = window.location.href + "?session=" + this.lobby_id
      navigator.clipboard.writeText(url)
    },
    host_selection(slot, key) {
      this.selection[slot] = key;
    },
    generate() {
      var str = this.heroes.filter(_ => _.primary_attribute == "STRENGTH")
      var agi = this.heroes.filter(_ => _.primary_attribute == "AGILITY")
      var int = this.heroes.filter(_ => _.primary_attribute == "INTELLECT")
      var slots = []
      var selection = []

      for (let i = 0; i < 10; i++) {  
        do {
          selection = []
          selection.push(str.random())
          selection.push(agi.random())
          selection.push(int.random())
        } while(this.selection_invalid(slots, selection))
        slots[i] = selection;
      }

      return slots;
    },
    selection_invalid(slots, selection) {
      var collection = slots.flat();
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
    },
    async connect_lobby() {
      let self = this;

      var urlNegotiate = `${process.env.VUE_APP_BASE_URL}/api/single/${this.lobby_id}`;
      var urlCreateSession = `${process.env.VUE_APP_BASE_URL}/api/single/create`;

      await axios.post(urlCreateSession, {
        id: this.lobby_id,
        slots: self.slots
      });

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(urlNegotiate)
        .configureLogging(signalR.LogLevel.Information)
        .build();
      
      connection.on("SelectedSlot", (slot) => {
        self.connections[slot] = true;
      });

      connection.on("SelectedHero", (slot, key) => {
        self.selection[slot] = key;
      });

      connection.start();
    },
    async get_lobby() {
      var url = `${process.env.VUE_APP_BASE_URL}/api/single/get/${this.lobby_id}/`;
      var response = await axios.get(url)
      this.slots = response.data.slots
    },
    async claim_slot(index) {
      var url = `${process.env.VUE_APP_BASE_URL}/api/single/claim/`;
      await axios.post(url, {
        session: this.lobby_id,
        slot: index
      })
      this.slot = index;
    },
    async player_selection(key) {
      var url = `${process.env.VUE_APP_BASE_URL}/api/single/draft/`;
      await axios.post(url, {
        session: this.lobby_id,
        slot: this.slot,
        key: key
      })
      this.drafted = this.heroes.find(_ => _.key == key);
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
    },
  }
};
</script>

<style scoped>
.single-draft {
  padding: 4em 0 6em 0;
  text-align: left;
}
.image {
  margin: 2px;
  width: 100px;
  height: 50px;
}
.image-large {
  cursor: pointer;
  width: 230px;
  height: 275px;
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
.picked {
  filter: brightness(120%);
}
.discarded {
  filter: grayscale(100%) brightness(25%);
}
</style>