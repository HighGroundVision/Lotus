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
              <button type="button" class="btn btn-success" @click="onCreate">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import data from '@/data/heroes.json'
// import { v4 as uuid } from 'uuid';
// import axios from 'axios';
// import * as signalR from "@microsoft/signalr";
// import Commands from '@/components/Commands.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('single-draft/host')

export default {
  data() {
    return {}
  },
  mounted() {
    this.reset();

    this.$nextTick(() => {
      window.scrollTo(0, 0);
    })
  },
  methods: {
    onCreate() {
      this.create();
      this.$router.push(`/single-draft/host`);
    },
    ...mapActions(['reset','create'])
  }
};
</script>

<style scoped>
.single-draft {
  padding: 4em 0 6em 0;
  text-align: left;
}
</style>