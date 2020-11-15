<template>
  <div id="board"></div>
</template>

<script>
// @ is an alias to /src
import { TicTacToeClient } from "../client";

export default {
  name: "Main",
  mounted() {
    this.client = new TicTacToeClient();
    const appElement = document.getElementById("board");
    this.client.start(appElement);
  },
  unmounted() {
    this.client.stop();
  }
};
</script>

<style scoped>
.cell {
  border: 1px solid #555;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
