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
              <p>
                Players are assigned to slots at random. 
                It is up to the host order the slots to reflect the lobby within Dota.
              </p>
              <p>
                The host can share the link with the lobby before or after players select teams and positions to control if the players knows their slot when selecting a hero.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-5" >
            <div class="card-body" >
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="switch_show_heroes_to_host" v-model="switch_show_heroes_to_host">
                <label class="form-check-label" for="switch_show_heroes_to_host">Show heroes to the host</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-5">
            <div class="card-header">
             <h5>Hero Selection</h5>
            </div>
            <div class="card-body">
              <div class="d-md-block d-lg-none">
                <div class="alert alert-danger" role="alert">
                  Error - The browser window is too small, increase the horizontal width.
                </div>
              </div>
              <div class="d-none d-lg-block">
                <div class="d-flex" style="height: 160px;">
                  <div class="d-flex flex-column mb-3" style="width:100%; flex-wrap: wrap;">
                    <div class="m-2 flex-fill text-center" style="height: 160px;">
                      <figure class="figure">
                        <img src="@/assets/radiant.png" class="rounded-top"/>
                        <figcaption class="figure-caption bg-secondary text-white rounded-bottom">Radiant</figcaption>
                      </figure>
                    </div>
                    <div class="m-2 flex-fill text-center" style="height: 160px;">
                      <figure class="figure">
                        <img src="@/assets/dire.png" class="rounded-top"/>
                        <figcaption class="figure-caption bg-secondary text-white rounded-bottom">Dire</figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
                <div class="d-flex" style="height: 400px;">
                  <div class="d-flex flex-column mb-3" style="width:100%; flex-wrap: wrap;">
                    <draggable v-model="collection" tag="transition-group" item-key="id" ghost-class="ghost" group="slots">
                      <template #item="{element}">
                        <div class="m-2 flex-fill bg-light border border-2 rounded" style="height: 50px;">
                          <div class="d-flex">
                            <div class="p-2 flex-shrink-1">
                              <img v-if="element.player.id == null" src="@/assets/user-disconnected.svg" class="user user-disconnected"/>
                              <img v-else-if="element.choice == null" src="@/assets/user-connected.svg" class="user user-connected"/>
                              <img v-else src="@/assets/user-star.svg" class="user user-picked"/>
                            </div>
                            <div class="p-2 flex-grow-1">
                              <h3>
                                {{element.player.name ?? 'Disconnected'}}
                              </h3>
                            </div>
                            <div class="p-2" v-if="switch_show_heroes_to_host">
                              <template v-for="(id) in element.selection" v-bind:key="id">
                                <img v-if="element.choice"  @click="overwrite(element.id, id)" :src="image(id)" class="p-1" v-bind:class="{'picked': id == element.choice, 'discarded': id != element.choice}" />
                                <img v-else  @click="overwrite(element.id, id)" :src="image(id)" class="p-1" />
                              </template>
                            </div>
                             <div class="p-2">
                               <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                <ul  class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                  <li v-if="element.choice != null" ><a @click="clear(element.id)" class="dropdown-item">Clear Choice</a></li>
                                  <li v-if="element.player.id != null"><a @click="kick(element.id)" class="dropdown-item">Kick Player</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </draggable>
                  </div>
                </div>
              </div>

            </div>
            <div class="card-footer">
               <button type="button" class="btn btn-success" @click="share">Share</button>           
            </div>
          </div>
        </div>
      </div>
      <Commands :options="options" ></Commands>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import heroes from '@/data/heroes.json'
//import { v4 as uuid } from 'uuid';
import * as signalR from "@microsoft/signalr";
import draggable from 'vuedraggable'
import Commands from '@/components/Commands.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Commands, draggable
  },
  data() {
    return {
      switch_show_heroes_to_host: false,
    };
  },
  created () {
    this.load();
    this.loadPersona();
    this.signalR();
  },
  computed: {
    ...mapState('single-draft/host', {
      lobby_id: state => state.id,
      slots: state => state.slots,
    }),
    ...mapState('single-draft/persona', {
      persona: state => state.persona,
    }),
    collection: {
      get: function () {
        return this.slots;
      },
      set: function (slots) {
        this.reorder({slots});
      }
    },
    options: function () {
      let r = this.slots.slice(0,5).filter(_ => _.choice != null).map(_ => this.hero(_.choice));
      let d = this.slots.slice(5).filter(_ => _.choice != null).map(_ => this.hero(_.choice));

      return {
        roster_radiant: r,
        roster_dire: d,
        roster_extra: [],
        shuffle_player: true,
      };
    },
  },
  methods: {
    signalR() {    
      var url = `${process.env.VUE_APP_BASE_URL}/api/single/${this.lobby_id}`;
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .configureLogging(signalR.LogLevel.Information)
        .build();
      
      let self = this;
      connection.on("join", (player_id, player_name) => {     
        self.join({id: player_id, name: player_name});
      });
      connection.on("choice", (slot_id, choice) => {
        self.selection({slot_id: slot_id, choice: choice});
      });

      connection.start();
    },
    share() {
      let url = window.location.origin + "/#/single-draft/player/" + this.lobby_id;
      navigator.clipboard.writeText(url);
    },
    overwrite(slot, id) {
      this.pick({ slot_id: slot, choice: id });
    },
    clear(slot) {
      this.pick({ slot_id: slot, choice: null });
    },
    kick(slot) {
      this.boot({slot_id: slot });
    },
    image: (id) => {
      return heroes.find(_ => _.id == id).image_icon;
    },
    hero: (id) => {
      return heroes.find(_ => _.id == id);
    },
    ...mapActions('single-draft/host', ['load', 'join', 'pick', 'boot', 'selection', 'reorder']),
    ...mapActions('single-draft/persona', ['loadPersona','changePersona']),
  }
};
</script>

<style scoped>
.single-draft {
  padding: 4em 0 6em 0;
  text-align: left;
}
.user {
  height: 32px;
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
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.break-column {
  flex-basis: 100%;
  width: 0;
}
.picked {
  filter: brightness(110%);
}
.discarded {
  filter: grayscale(100%) brightness(60%);
}
</style>

