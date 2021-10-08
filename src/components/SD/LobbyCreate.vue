<template>
  <div>
    <div style="max-width: 800px; width: 100%; margin: auto; text-align: center; margin-top: 50px; margin-bottom: 50px">
      <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; width: 100%; margin: auto; margin-top: 50px; margin-bottom: 50px">
        <div style="font-size: 30px; margin-bottom: 5px">Create a Lobby</div>
        <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">
          The draft maybe Blind where no one but the host/spectators can see other players options and selection, Team where players can see the options and selection of other players on the same team, and Open where everyone can see each other options but only memebrs of same team can see each
          others selection. The Extra heroes may be Random the default, Host Choice where the host selects the extra heroes from those unselected.
        </div>
        <hr />
        <div style="display: flex">
          <div style="margin: 10px; min-width: 200px">
            <span>Visibility</span>
          </div>
          <div style="margin: 10px; width: 100%">
            <Multiselect v-model="visibility" :options="visibilityOptions" class="multiselect-purple" />
          </div>
        </div>
        <div style="display: flex">
          <div style="margin: 10px; min-width: 200px">
            <span>Extras</span>
          </div>
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

import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('sd/lobbies')

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      visibility: 1,
      visibilityOptions: [
        { value: 1, label: 'Blind' },
        { value: 2, label: 'Team' },
        { value: 3, label: 'Open' },
      ],
      extra: 1,
      extraOptions: [
        { value: 1, label: 'Random' },
        { value: 2, label: 'Host Choice' },
        // { value: 3, label: 'Players Vote' },
      ],
    }
  },
  mounted() {
    this.visibility = this.$route.query.visibility ?? 1
    this.extra = this.$route.query.extra ?? 1
  },
  methods: {
    ...mapActions(['createMatch', 'getHeroes']),
    async create() {
      try {
        let matchID = await this.createMatch({
          name: this.name,
          visibility: this.visibility,
          extra: this.extra,
        })
        this.$router.push({
          name: 'single-draft-lobby',
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
