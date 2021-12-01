<template>
  <div>
    <img alt="hero image" style="position: absolute; left: -50px; top: 0px; height: 390px; transform: scaleX(-1)" src="https://hyperstone.highgroundvision.com/images/heroes/profile/86.png" />
    <Menu />
    <Header>
      <template #title>FAQ</template>
      <template #description>We have the collected the the most common questions.</template>
    </Header>
    <div style="background: #191919; margin-top: -5px">
      <div style="max-width: 1200px; width: 100%; margin: auto; padding: 10px 0px; padding-bottom: 100px">
        <div style="display: flex; align-items: center; justify-content: center">
          <div style="font-size: 14px; color: #4d749e; margin-top: 10px; font-style: italic">If you do not find what your looking for join our <a style="text-decoration: underline" href="https://discord.gg/e9amncKzcc">Discord</a> and ask a question.</div>
        </div>
        <div>
          <ol>
            <li>
              I thought this was about testing Ability Draft what are all these custom lobbys? <br />
              With the addation of these console commands to test Ability Draft we also have the ability experimental lobbies for those that want to draft their heroes as well as their abilties.
            </li>
            <li>
              Are these custom game modes? <br />
              No, these are variants to generate the conosole commands needed to configure a custom Ability Draft Lobby.
            </li>
            <li>
              I copied the commands and Queue for Ability Draft but nothing happen, why? <br />
              These commands only work in the private lobby.
            </li>
            <li>
              Some variants require a host, why? <br />
              The host a speical player that normaly dose not draft but dose see what the players are doing and controls the flow of the draft through the phases, they are also reposible for getting the commands.
            </li>
            <li>
              How do I host and play in these variants at the same time? <br />
              You can open the brower in incognito or use another browser to host.
            </li>
          </ol>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
  components: {
    Menu,
    Header,
    Footer,
  },
  setup() {},
}
</script>

<style scoped>
li {
  padding: 5px;
}
</style>
