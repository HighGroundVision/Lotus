<template>
  <div>
    <div style="max-width: 800px; width: 100%; margin: auto; text-align: center; margin-top: 50px; margin-bottom: 50px">
      <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; width: 100%; margin: auto; margin-top: 50px; margin-bottom: 50px">
        <div style="font-size: 30px; margin-bottom: 5px">Create a Lobby</div>
        <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">
          The host may selet if there is ban phase and amount of seconds the players have to ban. The host may selet the amount of seconds the players have to pick their hero. The Extra heroes may be Random the default, Host Choice where the host selects the extra heroes from those unselected.
        </div>
        <hr />
        <div style="display: flex">
          <div style="margin: 10px; padding: 10px; min-width: 200px">Ban Phase <span v-if="banSwitch">Enabled</span><span v-else>Disabled</span></div>
          <div style="margin: 10px">
            <Toggle v-model="banSwitch" class="toggle-purple" />
          </div>
        </div>
        <div v-if="banSwitch" style="display: flex">
          <div style="margin: 10px; padding: 10px; min-width: 200px">Ban Time</div>
          <div style="margin: 10px; margin-top: 40px; width: 100%">
            <Slider v-model="banTime" :min="5" :max="30" class="slider-purple" />
          </div>
        </div>
        <div style="display: flex">
          <div style="margin: 10px; padding: 10px; min-width: 200px">Pick Time</div>
          <div style="margin: 10px; margin-top: 40px; width: 100%">
            <Slider v-model="pickTime" :min="10" :max="120" class="slider-purple" />
          </div>
        </div>
        <div style="display: flex">
          <div style="margin: 10px; padding: 10px; min-width: 200px">Extras</div>
          <div style="margin: 10px; width: 100%">
            <Multiselect v-model="extra" :options="extraOptions" class="multiselect-purple" />
          </div>
        </div>
        <div class="jnbrig" style="width: 100%" @click="create">
          <span style="font-size: 1.2em"> Create</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import Slider from '@vueform/slider'
import Toggle from '@vueform/toggle'

import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('ap/lobbies')

export default {
  components: {
    Multiselect,
    Slider,
    Toggle,
  },
  data() {
    return {
      banSwitch: true,
      banTime: 15,
      pickTime: 75,
      extra: 1,
      extraOptions: [
        { value: 1, label: 'Random' },
        { value: 2, label: 'Host Choice' },
      ],
    }
  },
  mounted() {
    // this.visibility = this.$route.query.visibility ?? 1
  },
  methods: {
    ...mapActions(['createMatch', 'getHeroes']),
    async create() {
      try {
        let matchID = await this.createMatch({
          banSwitch: this.banSwitch,
          banTime: this.banTime,
          pickTime: this.pickTime,
          extra: this.extra,
        })
        this.$router.push({
          name: 'all-pick-lobby',
          params: { matchID: matchID },
        })
      } catch (error) {
        this.$toast.open({ message: error.details, type: 'error' })
      }
    },
  },
}
</script>

<style scoped>
.jnbrig {
  background-color: rgb(89, 31, 130);
  padding: 12px 20px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid rgb(34, 34, 34);
  height: 50px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  margin-right: 2px;
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
