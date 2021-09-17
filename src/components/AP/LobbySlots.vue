<template>
  <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 50px; display: flex; align-items: center">
    <div style="padding: 5px; width: 100%">
      <div style="font-size: 30px; margin-bottom: 5px">Players</div>
      <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">You must select the same slot that you are in the Dota lobby afterwhich you will need to enter a persona.</div>
      <div style="display: flex; text-align: center; margin-top: 10px">
        <div style="width: 100%">
          <div class="radiant-header">
            <h1>RADIANT</h1>
          </div>
          <template v-for="(item, index) in players.slice(1, 6)" :key="item.id">
            <div v-if="item.name" class="jnbria">
              <span>{{ item.name }}</span>
            </div>
            <div v-else @click="claim(item.id)" class="jnbrig">
              <span>Claim Slot #{{ index + 1 }}</span>
            </div>
          </template>
        </div>
        <div style="width: 100%">
          <div class="dire-header">
            <h1>DIRE</h1>
          </div>
          <template v-for="(item, index) in players.slice(6, 11)" :key="item.id">
            <div v-if="item.name" class="jnbria">
              <span>{{ item.name }}</span>
            </div>
            <div v-else @click="claim(item.id)" class="jnbrig">
              <span>Claim Slot #{{ index + 6 }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('ap/lobby')

export default {
  data() {
    return {}
  },
  emits: ['refresh'],
  computed: {
    ...mapGetters(['matchID', 'players']),
  },
  methods: {
    ...mapActions(['joinSlot']),
    async claim(playerID) {
      try {
        let playerName = await this.$store.dispatch('persona/getName')
        await this.joinSlot({
          playerID: playerID.toString(),
          playerName: playerName,
        })
        this.$router.push({
          name: 'all-pick-game',
          params: { matchID: this.matchID },
        })
      } catch (error) {
        this.$toast.open({ message: error.details, type: 'error' })
        this.$emit('refresh')
      }
    },
  },
}
</script>

<style scoped>
.radiant-header {
  border: 2px solid #28af61;
  border-radius: 10px;
  margin: 10px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://hyperstone.highgroundvision.com/images/towers/radiant/profile.png');
  background-repeat: no-repeat;
  background-size: 100% 150%;
}

.dire-header {
  border: 2px solid #ab3225;
  border-radius: 10px;
  margin: 10px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://hyperstone.highgroundvision.com/images/towers/dire/profile.png');
  background-repeat: no-repeat;
  background-size: 100% 150%;
}

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

.dhjrhf {
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
  border-radius: var(--ms-radius, 4px);
  background: var(--ms-bg, #fff);
  font-size: var(--ms-font-size, 1rem);
  min-height: calc(var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) * var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2);
  min-width: 200px;
  color: var(--ms-font-color, #fff);
  --ms-font-color: #fff;
  --ms-bg: #222;
  --ms-bg-disabled: #222;
  --ms-border-color: #222;
  --ms-border-width: 2px;
  --ms-radius: 5px;
}
</style>
