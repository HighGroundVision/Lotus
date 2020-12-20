<template>
  <div style="margin-top: 0px; margin-bottom: 90px;">
    <div :id="id"></div>
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
        type: Array,
        required: true,
      },
      type: {
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
      if(vm.type == 1) {
        var format = wNumb({ decimals: 0, suffix: '%' });
        noUiSlider.create(slider, {
            start: vm.modelValue,
            connect: true,
            step: 1,
            range: {
                min: vm.min,
                max: vm.max
            },
            tooltips: [format, format],
            pips: {
                mode: 'steps',
                density: 10,
                format: format,
                filter: function(value, type) {
                  return value % 10 ? 0 : 1;
                }
            }
        });
      } else if (vm.type == 2) {
        var format = wNumb({ decimals: 1 });
        noUiSlider.create(slider, {
            start: vm.modelValue,
            connect: true,
            step: 0.1,
            range: {
                min: vm.min,
                max: vm.max
            },
            tooltips: [format, format],
            pips: {
                mode: 'steps',
                density: 3,
                format: format,
                filter: function(value, type) {
                  return (value - Math.floor(value)) !== 0 ? 0 : 1;
                }
            }
        });
      } else if (vm.type == 3) {
        var format = wNumb({ decimals: 0 });
        noUiSlider.create(slider, {
            start: vm.modelValue,
            connect: true,
            step: 1,
            range: {
                min: vm.min,
                max: vm.max
            },
            tooltips: [format, format],
            pips: {
                mode: 'steps',
                density: 10,
                format: format,
                filter: function(value, type) {
                  return value % 10 ? value % 5 ? -1 : 0 : 1;
                }
            }
        });
      } else if (vm.type == 4) {
        var format = wNumb({ decimals: 0 });
        noUiSlider.create(slider, {
            start: vm.modelValue,
            connect: true,
            step: 1,
            range: {
                min: vm.min,
                max: vm.max
            },
            /*
            tooltips: [format],
            pips: {
                mode: 'steps',
                density: 10,
                format: format,
                filter: function(value, type) {
                  return value % 10 ? value % 5 ? -1 : 0 : 1;
                }
            }
            */
        });
      }
      
      slider.noUiSlider.on('change.one', function (values, handle, unencoded, tap, positions, noUiSlider) {
        vm.$emit('update:modelValue', unencoded);
      });
    })
    
  }
};
</script>

<style scoped>
</style>
