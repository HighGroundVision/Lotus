<template>
  <div>
    <div style="max-width: 600px; width: 100%; margin: auto; text-align: center; margin-top: 50px; margin-bottom: 50px">
      <div @click="create" class="jnbrig" style="">
        <span style="font-size: 1.2em"> Create</span>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('sd')

export default {
  setup() {},
  computed: {},
  methods: {
    ...mapActions(['createMatch', 'findMatches']),
    async create() {
      let config = {}
      await this.createMatch(config)
      await this.findMatches()
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
</style>
