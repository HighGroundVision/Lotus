<template>
  <div class="elimination-draft">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="card" >
            <div class="card-body" >
              <h1>Elimination</h1>
              <p class="card-text">
                Once a hero is picked they are eliminated from future pools.
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
              <h5>Ready Check</h5>
            </div>
            <div class="card-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia, sapien vitae rutrum lacinia, metus sem volutpat tellus, ut blandit lacus lacus ac lacus. Morbi porttitor, quam eu malesuada luctus, felis eros pulvinar arcu, sed fringilla lorem eros ut risus. Nulla sollicitudin, risus in sollicitudin euismod, nisi velit luctus nibh, pharetra elementum purus leo nec nibh. Ut suscipit tempor interdum. Curabitur pharetra odio a malesuada tincidunt. Curabitur non dolor sed dui condimentum interdum. Donec viverra mi a urna tempor fermentum. Donec nec diam sed massa volutpat efficitur id ut lacus. Donec molestie purus et ultricies tincidunt. Morbi dictum, nisi non tincidunt luctus, dui tortor porttitor diam, non porta lacus urna non leo. Quisque consequat placerat dui non bibendum. Morbi blandit pretium nisl eget tincidunt. Fusce sollicitudin viverra lacus ut mollis.</p>

            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-success m-1" @click="ready">Ready</button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <!--TODO:
        #. Ready
        #. StartClock (SingleR)
        #. SubmitChoice
        #. 
      -->
    </div>
  </div>
</template>

<script>
import data from '@/data/heroes.json';
import axios from 'axios';
import Countdown from 'countdown-vue'
import * as signalR from "@microsoft/signalr";

export default {
  components: { Countdown },
  data() {
    return {
      filter: null,
      heroes: data,
      data: null,
      side: null,
    };
  },
  computed: {
    test() {
      return false;
    },
  },
  created () {
    this.fetchData();
    this.start();
  },
  methods: {
    async fetchData() {
      var id = this.$route.params.id;
      this.side = this.$route.params.side;
      var url = `${process.env.VUE_APP_BASE_URL}/api/elimination/${id}`;
      var response = await axios.get(url);
      this.data = response.data;
    },
    start() {
      let self = this;
      let id = this.$route.params.id;
      let match = this.$route.params.match;
      let urlNegotiate = `${process.env.VUE_APP_BASE_URL}/api/elimination/${id}/match/${match}`;
      
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(urlNegotiate)
        .configureLogging(signalR.LogLevel.Information)
        .build();
      
      connection.on("update", () => {
        self.fetchData();
      });

      connection.start();
    }
  }
};
</script>

<style scoped>
.elimination-draft {
  padding: 4em 0 6em 0;
  text-align: left;
}
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
</style>