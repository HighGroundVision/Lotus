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

<style scoped>
.multiselect-purple {
  /*margin-right: 2px; min-width: 200px; background: #222; padding: 12px; border-radius: 5px 5px 5px 5px; border: 2px solid #222; height: 50px; outline: 0; color: #fff*/
  --ms-bg: #222;
  --ms-bg-disabled: #222;
  --ms-border-color: #222;
  --ms-border-width: 2px;
  --ms-ring-color: rgb(89, 31, 130);
  --ms-placeholder-color: #6161ab;
  --ms-radius: 5px;
  --ms-dropdown-bg: #222;
  --ms-dropdown-border-color: #222;
  --ms-dropdown-border-width: 2px;
  --ms-dropdown-radius: 5px;
  --ms-option-bg-pointed: rgb(121, 121, 121);
  --ms-option-bg-selected: #6161ab;
  --ms-option-bg-disabled: rgb(121, 121, 121);
  --ms-option-bg-selected-pointed: 6161ab;
  --ms-option-bg-selected-disabled: rgb(121, 121, 121);
  --ms-option-color-pointed: rgb(89, 31, 130);
  --ms-option-color-selected: rgb(121, 121, 121);
  --ms-option-color-disabled: rgb(121, 121, 121);
  --ms-option-color-selected-pointed: rgb(121, 121, 121);
  --ms-option-color-selected-disabled: #6161ab;
  --ms-tag-bg: #6161ab;
  --ms-tag-bg-disabled: #9ca3af;
  --ms-tag-color: #ffffff;
  --ms-tag-color-disabled: #ffffff;
}
</style>
