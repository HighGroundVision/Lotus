<template>
  <div>
    <div style="max-width: 800px; width: 100%; margin: auto; text-align: center; margin-top: 50px; margin-bottom: 50px">
      <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; width: 100%; margin: auto; margin-top: 50px; margin-bottom: 50px">
        <div style="font-size: 30px; margin-bottom: 5px">Create a Lobby</div>
        <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum posuere urna nec tincidunt. Fringilla phasellus faucibus scelerisque eleifend. Penatibus et magnis dis parturient montes. Aenean vel elit scelerisque
          mauris. At consectetur lorem donec massa sapien faucibus et molestie. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Dignissim suspendisse in est ante in nibh.
        </div>
        <hr />
        <div style="display: flex">
          <div style="margin: 10px; padding: 10px; width: 200px">Time</div>
          <div style="margin: 10px; margin-top: 40px; width: 100%">
            <Slider v-model="time" :min="30" :max="300" :step="5" :format="{ suffix: 's' }" class="slider-purple" />
          </div>
        </div>
        <div style="display: flex">
          <div style="margin: 10px; padding: 10px; width: 200px">
            <div>Phases</div>
            <div style="font-size: 14px; color: #4d749e; margin-top: 10px; font-style: italic">Click a phase to add it to the sequence.</div>
          </div>
          <div style="margin: 10px; width: 100%">
            <template v-for="element in options" :key="element.id">
              <div @click="add(element)">
                <div v-if="element.team == '1'" class="team team-radiant">
                  <img v-if="element.stage == 'ban'" src="@/assets/ban.svg" style="height: 16px; width: 16px; float: right" />
                  <img v-if="element.stage == 'pick'" src="@/assets/pick.svg" style="height: 16px; width: 16px; float: right" />
                  <img v-if="element.stage == 'extra'" src="@/assets/extra.svg" style="height: 16px; width: 16px; float: right" />
                  <div style="height: 16px; width: 16px; float: left"></div>
                  <div style="">Radiant {{ element.stage }}</div>
                </div>
                <div v-if="element.team == '2'" class="team team-dire">
                  <img v-if="element.stage == 'ban'" src="@/assets/ban.svg" style="height: 16px; width: 16px; float: left" />
                  <img v-if="element.stage == 'pick'" src="@/assets/pick.svg" style="height: 16px; width: 16px; float: left" />
                  <img v-if="element.stage == 'extra'" src="@/assets/extra.svg" style="height: 16px; width: 16px; float: left" />
                  <div style="height: 16px; width: 16px; float: right"></div>
                  <div>Dire {{ element.stage }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div style="display: flex">
          <div style="margin: 10px; padding: 10px; width: 200px">
            <div>Sequence</div>
            <div style="font-size: 14px; color: #4d749e; margin-top: 10px; font-style: italic">Drag and drop to reoder the sequence. Double click a phase to remove it from the sequence.</div>
          </div>
          <div style="margin: 10px; width: 100%">
            <draggable v-model="sequence" group="sequence" ghost-class="ghost" item-key="id" style="border-radius: 5px 5px 5px 5px; border: 2px solid rgb(34, 34, 34); min-height: 70px">
              <template #item="{ element }">
                <div @dblclick="remove(element)">
                  <div v-if="element.team == '1'" class="team team-radiant">
                    <img v-if="element.stage == 'ban'" src="@/assets/ban.svg" style="height: 16px; width: 16px; float: right" />
                    <img v-if="element.stage == 'pick'" src="@/assets/pick.svg" style="height: 16px; width: 16px; float: right" />
                    <img v-if="element.stage == 'extra'" src="@/assets/extra.svg" style="height: 16px; width: 16px; float: right" />
                    <div style="height: 16px; width: 16px; float: left"></div>
                    <div style="">Radiant {{ element.stage }}</div>
                  </div>
                  <div v-if="element.team == '2'" class="team team-dire">
                    <img v-if="element.stage == 'ban'" src="@/assets/ban.svg" style="height: 16px; width: 16px; float: left" />
                    <img v-if="element.stage == 'pick'" src="@/assets/pick.svg" style="height: 16px; width: 16px; float: left" />
                    <img v-if="element.stage == 'extra'" src="@/assets/extra.svg" style="height: 16px; width: 16px; float: left" />
                    <div style="height: 16px; width: 16px; float: right"></div>
                    <div>Dire {{ element.stage }}</div>
                  </div>
                </div>
              </template>
            </draggable>
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
//import Multiselect from '@vueform/multiselect'
import Slider from '@vueform/slider'
//import Toggle from '@vueform/toggle'
import draggable from 'vuedraggable'
import { nanoid } from 'nanoid'

import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('cd/lobbies')

function CaptainsModeSequence() {
  return [
    { id: nanoid(), stage: 'ban', team: '2' },
    { id: nanoid(), stage: 'ban', team: '1' },
    { id: nanoid(), stage: 'ban', team: '2' },
    { id: nanoid(), stage: 'ban', team: '1' },

    { id: nanoid(), stage: 'pick', team: '2' },
    { id: nanoid(), stage: 'pick', team: '1' },
    { id: nanoid(), stage: 'pick', team: '1' },
    { id: nanoid(), stage: 'pick', team: '2' },

    { id: nanoid(), stage: 'ban', team: '2' },
    { id: nanoid(), stage: 'ban', team: '1' },
    { id: nanoid(), stage: 'ban', team: '2' },
    { id: nanoid(), stage: 'ban', team: '1' },
    { id: nanoid(), stage: 'ban', team: '2' },
    { id: nanoid(), stage: 'ban', team: '1' },

    { id: nanoid(), stage: 'pick', team: '1' },
    { id: nanoid(), stage: 'pick', team: '2' },
    { id: nanoid(), stage: 'pick', team: '2' },
    { id: nanoid(), stage: 'pick', team: '1' },

    { id: nanoid(), stage: 'ban', team: '2' },
    { id: nanoid(), stage: 'ban', team: '1' },
    { id: nanoid(), stage: 'ban', team: '2' },
    { id: nanoid(), stage: 'ban', team: '1' },

    { id: nanoid(), stage: 'pick', team: '2' },
    { id: nanoid(), stage: 'pick', team: '1' },

    { id: nanoid(), stage: 'extra', team: '2' },
    { id: nanoid(), stage: 'extra', team: '1' },
  ]
}

function CaptainsDraftSequence() {
  return [
    { id: nanoid(), stage: 'ban', team: '2' },
    { id: nanoid(), stage: 'ban', team: '1' },
    { id: nanoid(), stage: 'pick', team: '2' },
    { id: nanoid(), stage: 'pick', team: '1' },
    { id: nanoid(), stage: 'pick', team: '2' },
    { id: nanoid(), stage: 'pick', team: '1' },
    { id: nanoid(), stage: 'pick', team: '2' },
    { id: nanoid(), stage: 'pick', team: '1' },
    { id: nanoid(), stage: 'pick', team: '2' },
    { id: nanoid(), stage: 'pick', team: '1' },
    { id: nanoid(), stage: 'pick', team: '2' },
    { id: nanoid(), stage: 'pick', team: '1' },
    { id: nanoid(), stage: 'extra', team: '2' },
    { id: nanoid(), stage: 'extra', team: '1' },
  ]
}

export default {
  components: {
    Slider,
    draggable,
  },
  data() {
    return {
      time: 180,
      options: [
        { id: 1, stage: 'ban', team: '1' },
        { id: 2, stage: 'pick', team: '1' },
        { id: 3, stage: 'extra', team: '1' },
        { id: 4, stage: 'ban', team: '2' },
        { id: 5, stage: 'pick', team: '2' },
        { id: 6, stage: 'extra', team: '2' },
      ],
      sequence: [],
    }
  },
  mounted() {
    switch (this.$route.query.sequence) {
      case 'blank':
        this.sequence = []
        break
      case 'captains-draft':
        this.sequence = CaptainsDraftSequence()
        break
      case 'captains-mode':
        this.sequence = CaptainsModeSequence()
        break
      default:
        break
    }
  },
  methods: {
    ...mapActions(['createMatch', 'getHeroes']),
    add(item) {
      this.sequence.push({ id: nanoid(), stage: item.stage, team: item.team })
    },
    remove(item) {
      this.sequence = this.sequence.filter((i) => i.id != item.id)
    },
    async create() {
      try {
        let matchID = await this.createMatch({
          name: this.name,
          sequence: this.sequence,
        })
        this.$router.push({
          name: 'captains-duel-lobby',
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
.ghost {
  opacity: 0.5;
  /* background: #c8ebfb; */
}

.team {
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  text-transform: uppercase;
  cursor: pointer;
}
.team-radiant {
  border: 2px solid rgb(89, 31, 130);
  /* border: 2px solid #55c897; */
  background: linear-gradient(270deg, rgba(25, 25, 25, 1), rgba(0, 0, 0, 0.1)), url('https://hyperstone.highgroundvision.com/images/towers/radiant/profile.png');
  background-repeat: no-repeat;
  background-size: 50% 200%;
  background-position: top left;
}
.team-dire {
  border: 2px solid rgb(89, 31, 130);
  /* border: 2px solid #ca3535; */
  background: linear-gradient(90deg, rgba(25, 25, 25, 1), rgba(0, 0, 0, 0.1)), url('https://hyperstone.highgroundvision.com/images/towers/dire/profile.png');
  background-repeat: no-repeat;
  background-size: 50% 200%;
  background-position: top right;
}

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
