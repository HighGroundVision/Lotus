<template>
  <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 600px; width: 100%; margin: auto; margin-bottom: 50px; display: flex; align-items: center">
    <div>
      <div style="font-size: 30px; margin-bottom: 5px">Existing Connetion Found</div>
      <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">You where already connected to this lobby.</div>
      <div style="display: flex; align-items: center">
        <div class="jnbrig" style="width: 50%" @click="reconnect">
          <span>Reconnect</span>
        </div>
        <div class="jnbria-" style="width: 50%" @click="leave">
          <span>Leave</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('cd/lobby')

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['matchID']),
  },
  methods: {
    ...mapActions(['leaveSlot']),
    reconnect() {
      this.$router.push({ name: 'captains-duel-game', params: { matchID: this.matchID } })
    },
    async leave() {
      await this.leaveSlot()
      this.$router.push({ name: 'captains-duel' })
    },
  },
}
</script>

<style scoped>
.jnbria- {
  margin: 10px;
  padding: 12px 20px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid rgb(34, 34, 34);
  height: 50px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
}
.jnbria-:hover {
  background: #6161ab;
  border: 2px solid #00000040 !important;
}

.jnbrig {
  margin: 10px;
  background-color: rgb(89, 31, 130);
  padding: 12px 20px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid rgb(34, 34, 34);
  height: 50px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
}

/*!sc*/
.jnbrig:hover {
  background: #6161ab;
  border: 2px solid #00000040 !important;
}
</style>
