<template>
  <div style="display: flex">
    <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 5px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 10px; margin-right: 5px; display: flex; align-items: center">
      <div style="padding: 10px; width: 100%">
        <div style="font-size: 30px; margin-bottom: 5px">Filters</div>
        <div style="color: rgba(255, 255, 255, 0.5)">
          <div style="padding: 0 1%">
            <div style="margin: 20px 1%; display: flex">
              <div style="flex: 1; padding: 10px">
                <span>Complexity</span>
              </div>
              <div style="flex: 5; flex-grow: 5">
                <Complexity v-model:complexity="complexity"></Complexity>
              </div>
            </div>
            <div style="margin: 20px 1%; display: flex">
              <div style="flex: 1; padding: 10px">
                <span>Primary Attribute</span>
              </div>
              <div style="flex: 5; flex-grow: 5">
                <Multiselect v-model="attribute" mode="tags" :options="attributeOptions" class="multiselect-purple" />
              </div>
            </div>
            <div style="margin: 20px 1%; display: flex">
              <div style="flex: 1; padding: 10px">
                <span>Roles</span>
              </div>
              <div style="flex: 5; flex-grow: 5">
                <Multiselect v-model="roles" mode="tags" :options="rolesOptions" class="multiselect-purple" />
              </div>
            </div>
            <div style="margin: 20px 1%; display: flex">
              <div style="flex: 1; padding: 10px">
                <span>Win Rate</span>
              </div>
              <div style="flex: 5; flex-grow: 5; padding-top: 20px">
                <Slider v-model="winrateRange" :min="30" :max="70" :step="1" class="slider-purple" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Complexity from '@/components/Complexity.vue'
import Slider from '@vueform/slider'
import Multiselect from '@vueform/multiselect'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('bd')

export default {
  components: {
    Slider,
    Complexity,
    Multiselect,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['attributeOptions', 'rolesOptions']),
    complexity: {
      get() {
        return this.$store.state.bd.complexity
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'complexity', value: value })
      },
    },
    attribute: {
      get() {
        return this.$store.state.bd.attribute
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'attribute', value: value })
      },
    },
    roles: {
      get() {
        return this.$store.state.bd.roles
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'roles', value: value })
      },
    },
    winrateRange: {
      get() {
        return this.$store.state.bd.winrateRange
      },
      set(value) {
        this.$store.commit('bd/set', { key: 'winrateRange', value: value })
      },
    },
  },
  methods: {},
}
</script>

<style scoped></style>
