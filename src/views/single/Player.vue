<template>
  <div class="single-draft">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-5" >
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

      <div class="row" v-if="status == 0">
        <div class="col-xl-12">
          <div class="card mb-5">
            <div class="card-header">
             <h5>Join</h5>
            </div>
            <div class="card-body">
              <p>
                You will need to enter the a Persona/Nickname to join the session.
              </p>
              <input v-model="player_name" class="form-control m-1" placeholder="Persona/Nickname" />
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary" v-bind:disabled="ready" @click="join">Join</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="status == 1">
        <div class="col-xl-12">
          <div class="card mb-5">
            <div class="card-header">
             <h5>Draft</h5>
            </div>
            <div class="card-body text-center">
              <template v-for="(item) in heroes" v-bind:key="item.id">
                <figure class="figure m-1" @click="pick(item.id)">
                  <img :src="item.image_banner" class="rounded-top"/>
                  <figcaption class="figure-caption bg-secondary text-white rounded-bottom text-center">{{item.name}}</figcaption>
                </figure>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="status == 2">
        <div class="col-xl-12">
          <div class="card mb-5">
            <div class="card-header">
             <h5>Selection</h5>
            </div>
            <div class="card-body text-center">
               <figure class="figure m-1">
                <img :src="hero.image_banner" class="rounded-top"/>
                <figcaption class="figure-caption bg-secondary text-white rounded-bottom text-center">{{hero.name}}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import heroes from '@/data/heroes.json'
import { v4 as uuid } from 'uuid';
import * as signalR from "@microsoft/signalr";
import { mapState, mapActions } from 'vuex'

export default {
  name: "SingleDraft",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  created () {
    this.loadPersona();
    this.signalR();
  },
  computed: {
    ready() {
      return !(this.persona && this.id);
    },
    player_name: {
      get() {
        return this.persona;
      },
      set(value) {
        this.changePersona({persona: value});
      }
    },
    status() {
      if(this.choice != null) {
        return 2;
      }
      if(this.slot_id != null) {
        return 1;
      }
      return 0;
    },
    heroes() {
      return this.selections.map(_ => this.getHero(_));
    },
    hero() {
      return this.getHero(this.choice);
    },
    ...mapState('single-draft/player', {
      lobby_id: state => state.lobby_id,
      slot_id: state => state.slot_id,
      selections: state => state.selections,
      choice: state => state.choice,
    }),
    ...mapState('single-draft/persona', {
      player_id: state => state.id,
      persona: state => state.persona,
    }), 
  },
  methods: {
    signalR() {
      var url = `${process.env.VUE_APP_BASE_URL}/api/single/${this.id}`;
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .configureLogging(signalR.LogLevel.Information)
        .build();
      
      let self = this;
      connection.on("claim", (player_id, slot_id, selection, choice) => {
        if(player_id == self.player_id) {
          self.claim({ slot_id, selection, choice });
        }
      });
      connection.on("pick", (slot_id, choice) => {
        if(slot_id == self.slot_id) {
           self.hostSelection({choice: choice});
        }
      });
      connection.on("kick", (player_id) => {
         if(player_id == self.player_id) {
           self.kick();
        }
      });

      connection.start();
    },
    join() {
      this.connect({ lobby_id: this.id, player_id: this.player_id,  player_name: this.persona });
    },
    pick(choice) {
      this.playerSelection({slot_id: this.slot_id, choice: choice});
    },
    getHero: (id) => {
      return heroes.find(_ => _.id == id);
    },
    ...mapActions('single-draft/player', ['load', 'connect', 'claim', 'hostSelection', 'playerSelection', 'kick']),
    ...mapActions('single-draft/persona', ['loadPersona','changePersona']),
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