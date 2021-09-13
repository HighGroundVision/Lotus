<template>
  <div>
    <!--
    <img alt="hero image" style="position: absolute; left: -50px; top: 0px; height: 390px; transform: scaleX(-1)" src="https://hyperstone.highgroundvision.com/images/heroes/profile/123.png" />
    -->
    <Menu />
    <Header>
      <template v-slot:title>Single Draft Lobby</template>
      <template v-slot:description>Players pick from a pool of one Strength hero, one Agility hero, and one Intelligence hero where the 3 choices are randomly picked and exclusive to that player. </template>
    </Header>
    <div style="background: #191919; margin-top: -5px">
      <div style="max-width: 1200px; width: 100%; margin: auto; padding: 40px 0px; padding-bottom: 100px">
        <div v-if="existing">
          <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 600px; width: 100%; margin: auto; margin-bottom: 50px; display: flex; align-items: center">
            <div>
              <div style="font-size: 30px; margin-bottom: 5px">Existing Connetion Found</div>
              <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">You where already connected to this lobby.</div>
              <div style="display: flex; align-items: center">
                <div @click="reconnect" class="jnbrig" style="width: 50%">
                  <span>Reconnect</span>
                </div>
                <div @click="leave" class="jnbria-" style="width: 50%">
                  <span>Leave</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 50px; display: flex; align-items: center">
            <div style="padding: 5px; width: 100%">
              <div style="font-size: 30px; margin-bottom: 5px">Players</div>
              <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">You must select the same slot that you are in the Dota lobby afterwhich you will need to enter a persona.</div>
              <div style="display: flex; text-align: center; margin-top: 10px">
                <div style="width: 100%">
                  <div
                    style="border: 2px solid #28af61; border-radius: 10px; margin: 10px; background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://hyperstone.highgroundvision.com/images/towers/radiant/profile.png'); background-repeat: no-repeat; background-size: 100% 150%"
                  >
                    <h1>RADIANT</h1>
                  </div>
                  <template v-for="(item, index) in players.slice(1, 6)" :key="item.id">
                    <div v-if="item.name" class="jnbria">
                      <span>{{ item.name }}</span>
                    </div>
                    <div v-else @click="claim(item.id)" class="jnbrig">
                      <span>Claim Slot #{{ index + 1 }}</span>
                    </div>
                  </template>
                </div>
                <div style="width: 100%">
                  <div style="border: 2px solid #ab3225; border-radius: 10px; margin: 10px; background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://hyperstone.highgroundvision.com/images/towers/dire/profile.png'); background-repeat: no-repeat; background-size: 100% 150%">
                    <h1>DIRE</h1>
                  </div>
                  <template v-for="(item, index) in players.slice(6, 11)" :key="item.id">
                    <div v-if="item.name" class="jnbria">
                      <span>{{ item.name }}</span>
                    </div>
                    <div v-else @click="claim(item.id)" class="jnbrig">
                      <span>Claim Slot #{{ index + 6 }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 10px; margin-bottom: 50px; display: flex; align-items: center">
            <div style="padding: 5px">
              <div style="font-size: 30px; margin-bottom: 5px">Host</div>
              <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">The host starts the draft when all players are in the correct slot. They also see the roster, each players options and can generate the commands</div>
              <template v-for="item in players.slice(0, 1)" :key="item.id">
                <div v-if="item.name" class="jnbria" style="width: 50%; text-align: center">
                  <span>{{ item.name }}</span>
                </div>
                <div v-else @click="claim(item.id)" class="jnbrig" style="width: 50%; text-align: center">
                  <span>Claim</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <Persona />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Persona from '@/components/Persona.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('sd/lobby')

export default {
  data() {
    return {}
  },
  async mounted() {
    try {
      let matchId = this.$route.params.matchID
      await this.loadMatch(matchId)
    } catch (error) {
      this.$toast.open({ message: error.details, type: 'error' })
      this.$router.push({ name: 'single-draft' })
    }
  },
  components: {
    Menu,
    Header,
    Footer,
    Persona,
  },
  computed: {
    ...mapState(['playerID']),
    ...mapGetters(['existing', 'matchID', 'players', 'data']),
  },
  methods: {
    ...mapActions(['loadMatch', 'joinSlot', 'leaveSlot']),
    async claim(playerID) {
      try {
        let playerName = await this.$store.dispatch('persona/getName')
        let options = {
          playerID: playerID.toString(),
          playerName: playerName,
        }
        await this.joinSlot(options)
        this.$router.push({ name: 'single-draft-game', params: { matchID: this.matchID } })
      } catch (error) {
        this.$toast.open({ message: error.details, type: 'error' })
        await this.loadMatch(this.matchID)
      }
    },
    reconnect() {
      this.$router.push({ name: 'single-draft-game', params: { matchID: this.matchID } })
    },
    async leave() {
      await this.leaveSlot()
      this.$router.push({ name: 'single-draft' })
    },
  },
}
</script>

<style scoped>
.jnbria {
  margin: 10px;
  padding: 12px 20px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid #6161ab;
  height: 50px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
}
.jnbria- {
  margin: 10px;
  padding: 12px 20px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid rgb(34, 34, 34);
  height: 50px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
}
.jnbria-:hover {
  background: #6161ab;
  border: 2px solid #00000040 !important;
}

.jnbrig {
  margin: 10px;
  background-color: rgb(89, 31, 130);
  padding: 12px 20px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid rgb(34, 34, 34);
  height: 50px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
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
