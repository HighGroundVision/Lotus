<template>
  <div class="row">
    <div class="col-xl-10">
      <div :id="id" ></div>
    </div>
    <div class="col-xl-2">
      <span class="badge badge-primary">{{modelValue}}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import data from '@/data/heroes.json'
import { v4 as uuid } from 'uuid';
import wNumb from 'wnumb';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

export default {
  name: "Admin",
  data() {
    return {
      id: uuid(),
    };
  },
  props: {
      modelValue: {
        type: Number,
        required: true,
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      }
  },
  emits: ['update:modelValue'],
  computed: {
    commands: function() {
    }
  },
  methods: {
    help() {}
  },
  mounted() {
    let vm = this;
    vm.$nextTick(() => {
      var slider = document.getElementById(vm.id);
      noUiSlider.create(slider, {
          start: vm.modelValue,
          connect: true,
          step: 1,
          range: {
              min: vm.min,
              max: vm.max
          },
      });
      slider.noUiSlider.on('update', function (values, handle, unencoded, tap, positions, noUiSlider) {
        var item = Math.round(unencoded[0]);
        vm.$emit('update:modelValue', item);
      });
    })
    
  }
};
</script>

<style scoped>
</style>
