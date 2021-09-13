<template>
  <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 5px; width: 40%; margin: auto; margin-top: 10px; margin-bottom: 10px; margin-left: 5px; display: flex; align-items: center">
    <div style="padding: 10px; width: 100%">
      <div style="font-size: 30px; margin-bottom: 5px">Order</div>
      <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">
        <div style="display: flex; padding: 0 1%">
          <div style="flex: 1; margin: 0 1%">
            <p>Sequence</p>
            <Multiselect v-model="sequence" :options="sequenceOptions" class="multiselect-purple" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('bd')

export default {
  data() {
    return {}
  },
  components: {
    Multiselect,
  },
  computed: {
    ...mapGetters(['sequenceOptions']),
    sequence: {
      get() {
        return this.$store.state.bd.sequence
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'sequence', value: value })
      },
    },
  },
  methods: {},
}
</script>

<style scoped></style>
