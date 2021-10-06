<template>
  <div style="display: flex">
    <div class="jsdfjdsk" :class="{ 'jsdfjdsk-': complexity > 0 }" :style="{ 'background-image': 'url(' + require('@/assets/filter-diamond.png') + ')' }" @click="select(1)"></div>
    <div class="jsdfjdsk" :class="{ 'jsdfjdsk-': complexity > 1 }" :style="{ 'background-image': 'url(' + require('@/assets/filter-diamond.png') + ')' }" @click="select(2)"></div>
    <div class="jsdfjdsk" :class="{ 'jsdfjdsk-': complexity > 2 }" :style="{ 'background-image': 'url(' + require('@/assets/filter-diamond.png') + ')' }" @click="select(3)"></div>
  </div>
</template>

<script>
export default {
  props: ['complexity'],
  emits: ['update:complexity'],
  setup() {},
  methods: {
    select(value) {
      if (this.complexity == value) {
        this.$emit('update:complexity', null)
      } else {
        this.$emit('update:complexity', value)
      }
    },
  },
}
</script>

<style scoped>
.jsdfjdsk {
  /*background-image: url('@/assets/filter-diamond.png');*/
  width: 43px;
  height: 35px;
  margin-left: -4px;
  background-size: cover;
  background-repeat: no-repeat;
  transition-property: filter;
  transition-timing-function: ease-in-out;
  transition-duration: 0.1s;
  cursor: pointer;
  color: #fff;
  filter: brightness(0.5) saturate(0);
}
.jsdfjdsk- {
  filter: brightness(1) saturate(1);
}
</style>
