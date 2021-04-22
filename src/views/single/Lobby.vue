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
      <div v-if="!joined" class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
             <h5>Join</h5>
            </div>
            <div class="card-body">
              <p>
                You will need to enter the Identity and a Persona/Nickname to join the session.
              </p>
              <input v-model="id" class="form-control m-1" placeholder="Session Identity" />
              <input v-model="name" class="form-control m-1" placeholder="Persona/Nickname" />
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary" v-bind:disabled="id == '' || name == ''" @click="join">Join</button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="joined && !isReady" class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header">
             <h5>Lobby</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6">
                  <h4 class="text-success text-center">The Radiant</h4>
                  <template v-for="(item, i) in radiant" v-bind:key="item.slot">
                    <div class="card p-1 m-2">
                      <div class="d-flex flex-row">
                        <div class="mr-auto">
                          <span v-if="item.state == 0">Slot {{(i+1)}}</span>
                          <span v-if="item.state > 0">{{item.name}}</span>
                        </div>
                        <div>
                          <button v-if="selected_slot == item.slot" type="button" class="btn btn-sm btn-secondary" @click="release(item.slot)">Release</button>
                          <button v-if="item.state == 0 && selected_slot == null" type="button" class="btn btn-sm btn-secondary" @click="claim(item.slot)">Claim</button>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
                <div class="col-xl-6">
                  <h4 class="text-danger text-center">The Dire</h4>
                  <template v-for="(item, i) in dire" v-bind:key="item.slot">
                    <div class="card p-1 m-2">
                      <div class="d-flex flex-row">
                        <div class="mr-auto">
                          <span v-if="item.state == 0">Slot {{(i+1)}}</span>
                          <span v-if="item.state > 0">{{item.name}}</span>
                        </div>
                        <div >
                          <button v-if="selected_slot == item.slot" type="button" class="btn btn-sm btn-secondary" @click="release(item.slot)">Release</button>
                          <button v-if="item.state == 0 && selected_slot == null" type="button" class="btn btn-sm btn-secondary" @click="claim(item.slot)">Claim</button>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row" v-if="joined && isReady">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
             <h5>Draft</h5>
            </div>
            <div class="card-body text-center">
              <div v-if="selected_hero">
                <img :src="selected_hero.image_banner" class="image-large"  />
                <h5>{{selected_hero.name}}</h5>
              </div>
              <div v-else>
                <template v-for="(item) in selection" v-bind:key="item.id">
                  <img :src="item.image_banner" class="image" @click="choice(item)"  />
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
             <h5>Lobby</h5>
            </div>
            <div class="card-body text-center">
              <div v-if="!data.switch_show_selection_team" class="alert alert-info" role="alert">
                The host has chosen not to share the the selections with the teams.
              </div>
              <div v-else>
                <p>You Teammate Options</p>
                <template v-for="(item) in team" v-bind:key="item.slot">
                 <template v-for="(selection) in item.selection" v-bind:key="selection.id">
                    <div v-if="item.choice" class="d-inline">
                      <img :src="selection.image_banner" class="image" v-bind:class="{'picked':item.choice?.id == selection.id, 'discarded': item.choice?.id != selection.id}" />
                    </div>
                    <div v-else class="d-inline">
                      <img :src="selection.image_banner" class="image" />
                    </div>
                  </template>
                  <br />
               </template>
              </div>
              <br />
              <div v-if="!data.switch_show_choice" class="alert alert-info" role="alert">
                The host has chosen not to share the the player's choice with the teams.
              </div>
               
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import * as signalR from "@microsoft/signalr";

export default {
  name: "SingleDraft",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      name: window.localStorage.getItem('persona') ?? '',
      data: null,
      joined: false,
      selected_slot: null,
      selected_hero: null,
    }
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
    selection: function() {
      let slots = this.data?.slots ?? [];
      let slot = slots.find(_ => _.slot == this.selected_slot);
      return slot?.selection ?? [];
    },
    team: function() {
      if(this.selected_slot == null) 
        return [];

      if(this.selected_slot < 6)
        return this.radiant.filter(_ => _.slot != this.selected_slot);
      else
        return this.dire.filter(_ => _.slot != this.selected_slot);
    }
  },
  methods: {
    async fetch() {
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/${this.id}`;
      let response = await axios.get(url);
      this.data = response.data;
    },
    connect() {
      var url = `${process.env.VUE_APP_BASE_URL}/api/single/${this.id}`;
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .configureLogging(signalR.LogLevel.Information)
        .build();
      
      let self = this;
      connection.on("update", () => {
        self.fetch();
      });

      connection.start();
    },
    join() {
      window.localStorage.setItem('persona', this.name);
      
      this.fetch();
      this.connect();
      this.joined = true;
    },
    async claim(slot) {
      let body = {
        name: this.name,
        slot: slot,
      };
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/${this.id}/claim`;
      
      let self = this;
      await axios.post(url, body).catch(error => {
        self.$toast.error(error.response.data);
      });

      this.selected_slot = slot;
    },
    async release(slot) {
     
      let body = {
        slot: slot,
      };
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/${this.id}/release`;
      await axios.post(url, body);

      this.selected_slot = null;
    },
    async choice(selection) {
      let body = {
        slot: this.selected_slot,
        choice: selection
      };
      let url = `${process.env.VUE_APP_BASE_URL}/api/single/${this.id}/choice`;
      await axios.post(url, body);

      this.selected_hero = selection;
    }
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
  width: 300px;
  height: 150px;
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