<template>
  <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 5px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 10px; margin-right: 5px; display: flex; align-items: center">
    <div style="padding: 10px; width: 100%">
      <div style="font-size: 14px; color: #4d749e; font-style: italic; float: right; margin: 5px">Attempt to balance out the selected types for each side</div>
      <div style="font-size: 30px; margin-bottom: 5px">Balance</div>
      <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">
        <div style="display: flex; padding: 0 1%">
          <div style="flex: 1; margin: 0 1%">
            <p>Primary Attribute</p>
            <div style="padding: 2px">
              <Toggle v-model="balanceAttribute" class="toggle-purple" />
            </div>
          </div>
          <div style="flex: 1; margin: 0 1%">
            <p>Attack Capabilities</p>
            <div style="padding: 2px">
              <Toggle v-model="balanceCapabilities" class="toggle-purple" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from '@vueform/toggle'

export default {
  components: {
    Toggle,
  },
  data() {
    return {}
  },
  computed: {
    balanceAttribute: {
      get() {
        return this.$store.state.bd.balanceAttribute
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'balanceAttribute', value: value })
      },
    },
    balanceCapabilities: {
      get() {
        return this.$store.state.bd.balanceCapabilities
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'balanceCapabilities', value: value })
      },
    },
  },
  methods: {},
}
</script>

<style scoped></style>
