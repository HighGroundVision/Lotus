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
      <div class="row" v-if="data">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
             <h5>Options</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-12">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_show_selection_team" v-model="data.switch_show_selection_team" @change="save">
                    <label class="custom-control-label" for="switch_show_selection_team">Show Selection to Team</label>
                  </div>
                </div>
              </div>
               <div class="row">
                <div class="col-xl-12">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch_show_choice" v-model="data.switch_show_choice" @change="save">
                    <label class="custom-control-label" for="switch_show_choice">Show Choices to Team</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
            
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row" v-if="data">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
             <h5>Lobby</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6">
                  <h4 class="text-success text-center">The Radiant</h4>
                  <template v-for="(item) in radiant" v-bind:key="item.slot">
                    <div class="card p-0 m-1">
                      <div class="card-header p-1 m-0">
                        <div class="d-flex flex-row">
                          <div class="p-1">
                            <img v-if="item.state == 0" src="@/assets/user-disconnected.svg" class="user user-disconnected" />
                            <img v-if="item.state == 1" src="@/assets/user-connected.svg" class="user user-connected"/>
                            <img v-if="item.state == 2" src="@/assets/user-star.svg" class="user user-picked"/>
                          </div>
                          <div class="p-1 mr-auto">
                            <h5 v-if="item.state > 0">{{item.name}}</h5>
                            <h5 v-else>Disconnected</h5>
                          </div>
                          
                          <div class="p-1">
                            <div v-if="notReady">
                              <button v-if="item.state == 0" type="button" class="btn btn-sm btn-secondary" @click="claim(item.slot)">Claim</button>
                              <button v-if="item.state == 1" type="button" class="btn btn-sm btn-secondary" @click="release(item.slot)">Release</button>
                              <button v-if="item.state == 2" type="button" class="btn btn-sm btn-secondary" @click="release(item.slot)">Reset</button>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      <div class="card-body p-1 m-0">
                        <template v-for="(selection) in item.selection" v-bind:key="selection.id">
                          <img v-if="item.state == 2" :src="selection.image_banner" class="image" @click="choice(item, selection)" v-bind:class="{'picked':item.choice?.id == selection.id, 'discarded': item.choice?.id != selection.id}"  />
                          <img v-else :src="selection.image_banner" class="image" @click="choice(item, selection)"  />
                        </template>
                      </div>
                    </div>
                  </template>
                </div>
                <div class="col-xl-6">
                  <h4 class="text-danger text-center">The Dire</h4>
                  <template v-for="(item) in dire" v-bind:key="item.slot">
                    <div class="card p-0 m-1">
                      <div class="card-header p-1 m-0">
                        <div class="d-flex flex-row">
                          <div class="p-1">
                            <img v-if="item.state == 0" src="@/assets/user-disconnected.svg" class="user user-disconnected" />
                            <img v-if="item.state == 1" src="@/assets/user-connected.svg" class="user user-connected"/>
                            <img v-if="item.state == 2" src="@/assets/user-star.svg" class="user user-picked"/>
                          </div>
                          <div class="p-1 mr-auto">
                            <h5 v-if="item.state > 0">{{item.name}}</h5>
                            <h5 v-else>Disconnected</h5>
                          </div>
                          
                          <div class="p-1">
                            <div v-if="notReady">
                              <button v-if="item.state == 0" type="button" class="btn btn-sm btn-secondary" @click="claim(item.slot)">Claim</button>
                              <button v-if="item.state == 1" type="button" class="btn btn-sm btn-secondary" @click="release(item.slot)">Release</button>
                              <button v-if="item.state == 2" type="button" class="btn btn-sm btn-secondary" @click="release(item.slot)">Reset</button>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      <div class="card-body p-1 m-0">
                        <template v-for="(selection) in item.selection" v-bind:key="selection.id">
                          <img v-if="item.state == 2" :src="selection.image_banner" class="image" @click="choice(item, selection)" v-bind:class="{'picked':item.choice?.id == selection.id, 'discarded': item.choice?.id != selection.id}"  />
                          <img v-else :src="selection.image_banner" class="image" @click="choice(item, selection)"  />
                        </template>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary m-1" @click="share">Share</button>
              <button type="button" class="btn btn-success m-1"  @click="next">Start</button>
              <!-- v-if="notReady" :disabled="!allReady" -->
            </div>
          </div>
        </div>
      </div>
      <br />
      <Commands v-if="data" :options="options" ></Commands>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import data from '@/data/heroes.json'
//import { v4 as uuid } from 'uuid';
import axios from 'axios';
import * as signalR from "@microsoft/signalr";
import Commands from '@/components/Commands.vue'


export default {
  components: {
    Commands
  },
  data() {
    return {
      data: null
    };
  },
  created () {
    this.fetch();
    this.connect();
  },
  computed: {
    radiant: function() {
      return this.data?.slots?.slice(0,5) ?? [];
    },
    dire: function() {
      return this.data?.slots?.slice(5) ?? [];
    },
    isReady: function() {
      return this.data?.ready ?? false;
    },
    notReady: function() {
      return !(this.data?.ready ?? false);
    },
    allReady: function() {
      let slots = this.data?.slots ?? [];
      let result = slots.map(_ => _.state == 1).reduce((acc, v) => acc && v);
      return result;
    },
    options: function () {
      return {
        roster_radiant: this.radiant.map(_ => _.choice).filter(_ => _ != null),
        roster_dire: this.dire.map(_ => _.choice).filter(_ => _ != null),
        shuffle_player: true,
      };
    }
  },
  methods: {
    async fetch() {
      let id = this.$route.params.id;
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/${id}`;
      let response = await axios.get(url);
      this.data = response.data;
    },
    async save() {
      let id = this.$route.params.id;
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/${id}`;
      let response = await axios.put(url, this.data);
    },
    connect() {
      let self = this;
      let id = this.$route.params.id;
      var url = `${process.env.VUE_APP_BASE_URL}/api/single/${id}`;
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .configureLogging(signalR.LogLevel.Information)
        .build();
      
      connection.on("update", () => {
        self.fetch();
      });

      connection.start();
    },
    async claim(slot) {
      this.claimed = false;
      let id = this.$route.params.id;
      
      let name = window.localStorage.getItem('persona') ?? 'Host';
      name = prompt("Please enter your persona/nickname", name);
      window.localStorage.setItem('persona', name);

      let body = {
        name: name,
        slot: slot,
      };
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/${id}/claim`;
      
      let self = this;
      await axios.post(url, body).catch(error => {
        self.$toast.error(error.response.data);
      });
    },
    async release(slot) {
      this.claimed = false;
      let id = this.$route.params.id;
      let body = {
        slot: slot,
      };
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/${id}/release`;
      await axios.post(url, body);
    },
    share() {
      let url = window.location.href.replace("/host/", "/lobby/");
      navigator.clipboard.writeText(url);
    },
    async next() {
      let id = this.$route.params.id;
      let body = {};
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/${id}/ready`;
      await axios.post(url, body);
    },
    async choice(item, selection) {
      let id = this.$route.params.id;
      let body = {
        slot: item.slot,
        choice: selection
      };
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/${id}/choice`;
      await axios.post(url, body);
    }
  }
};
</script>

<style scoped>
.single-draft {
  padding: 4em 0 6em 0;
  text-align: left;
}
.but-full {
  height: 50px;
  min-width: 80px;
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
  height: 32px;
  /*margin: 2px;*/
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