<template>
  <div style="position: absolute; top: 0px; right: 0px; z-index: 9; background-color: #591f82; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 10px; margin: 10px">
    <div v-if="change">
      <div style="display: flex">
        <input v-model="name" class="dhjrhf" />
        <img src="@/assets/edit.svg" style="padding-left: 5px" @click="change = false" />
      </div>
    </div>
    <div v-else @click="change = true">
      <div style="display: flex">
        <div>
          <span style="font-size: 1.2em">{{ name }}</span>
        </div>
        <img src="@/assets/edit.svg" style="padding-left: 5px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      change: false,
    }
  },
  computed: {
    name: {
      get() {
        return this.$store.state.persona.name
      },
      set(value) {
        this.$store.commit('persona/setName', value)
      },
    },
  },
  methods: {},
}
</script>

<style scoped>
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
