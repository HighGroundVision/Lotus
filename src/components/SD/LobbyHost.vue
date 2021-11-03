<template>
  <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 50px; display: flex; align-items: center">
    <div style="padding: 5px">
      <div style="font-size: 30px; margin-bottom: 5px">Host</div>
      <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">
        The host starts the draft when all players are in the correct slot. They also see the roster, each players options and can generate the commands. If you want to play as well as host you will need to use incognito mode or a second browser.
      </div>
      <template v-for="item in players.slice(0, 1)" :key="item.id">
        <div v-if="item.name" class="jnbria" style="width: 50%; text-align: center">
          <span>{{ item.name }}</span>
        </div>
        <div v-else class="jnbrig" style="width: 50%; text-align: center" @click="claim(item.id)">
          <span>Claim</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('sd/lobby')

export default {
  emits: ['refresh'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['matchID', 'players']),
  },
  methods: {
    ...mapActions(['joinSlot']),
    async claim(playerID) {
      try {
        let playerName = await this.$store.dispatch('persona/getName')
        let options = {
          playerID: playerID.toString(),
          playerName: playerName,
        }
        await this.joinSlot(options)
        this.$router.push({ name: 'single-draft-game', params: { matchID: this.matchID } })
      } catch (error) {
        this.$toast.open({ message: error.details, type: 'error' })
        this.$emit('refresh')
      }
    },
  },
}
</script>

<style scoped>
.jnbria {
  margin: 10px;
  padding: 12px 20px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid #6161ab;
  height: 50px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
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
