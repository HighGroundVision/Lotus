<template>
  <div class="home">
    <div class="container">
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-12">
          <div class="card" >
            <div class="card-body" >
              <p class="card-text">
                Welcome to High Ground Vision - Ability Drafter
              </p>
              <p class="card-text">
                With the addition of some new <a href="https://www.reddit.com/r/Abilitydraft/comments/jl4vo9/hero_roaster_for_custom_lobbies/">console commands</a> 
                to set the hero roaster (5 heroes for each team + 2 extras) we are interested in creating experimental lobbies to test different drafting strategies.
                We recommend that you use these tools first before lunching dota and creating the lobby as these tools have a 'Set Roster' 
                button that will start Dota directly and the console commands will be set for you via the Launch Options. 
                This saves you from having to enter the console commands one by one.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <h3>Lobby Host</h3>
              <p>
                You can use the following tools as the lobby host to set the roster but you have to select or generate the roster.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="@/assets/host_choice.png" alt="Admin Tool">
            <div class="card-body">
              <h5 class="card-title">Host Choice</h5>
              <p class="card-text">
                Select heroes and their team (Radiant/Dire/Extra) to create a roster.
                You do not have submit a complete roster the remain slots will random as normal.
              </p>
            </div>
            <div class="card-footer">
              <router-link to="/admin" class="btn btn-primary">Draft</router-link>
            </div>
          </div>
        </div>
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="@/assets/balance_draft.png" alt="Balance Draft Tool">
            <div class="card-body">
              <h5 class="card-title">Balanced Draft</h5>
              <p class="card-text">
                The draft is still randomly generated but there are a number of additional switches to Disqualify Heroes and/or Balance Teams.
                You can use these switches to create a fair and balanced draft or a complete clown festival the choice is yours.
              </p>
            </div>
            <div class="card-footer">
              <router-link to="/balanced" class="btn btn-primary">Draft</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <h3>Player Participation</h3>
              <p>
                You can use the following tools as the lobby host to set the roster but each player interact with these tools to create the roster.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="@/assets/single_draft.png" alt="Single Draft Tool">
            <div class="card-body">
              <h5 class="card-title">Single Draft</h5>
              <p class="card-text">
                Players pick from a pool of one Strength hero, one Agility hero, and one Intelligence hero where the 3 choices are randomly picked and exclusive to that player.
                The extra heroes are random.
              </p>
              <p class="blockquote-footer">Inspired by <a href="https://dota2.gamepedia.com/Game_modes#Single_Draft">Single Draft</a></p>
            </div>
            <div class="card-footer" style="height: 60px;">
            </div>
          </div>
        </div>
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="@/assets/horizon_draft.png" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Horizon Draft</h5>
              <p class="card-text">
                Players pick from a pool of 18 random heroes.
                There are a number of seconds in the pre-selection phase to review the randomly selected heroes.
                Then each player gets a few seconds to choose a hero or slot is left random.
                The extra heroes are random.
                <!--
                Players pick from a pool of 18 random heroes.
                There is a 15 seconds pre-selection phase to review the randomly selected heroes.
                Then each player gets 5 seconds to choose a hero or slot is left random.
                The extra heroes are random.
                -->
              </p>
              <p class="blockquote-footer">Submitted by HorizoN</p>
            </div>
            <div class="card-footer" style="height: 60px;">
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <h3>Tournaments</h3>
              <p>
                You can use the following tools as the lobby host to set the roster but two captions interact with these tools to create the roster.
              </p>
            </div>
          </div>
        </div>
      </div>
       <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="@/assets/captains_duel.png" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Captains Duel</h5>
              <p class="card-text">
                The lobby host populates the pool of available heroes.
                The captains ban certain heroes, up to 7 per team, preventing either team from picking the hero.
                The captain also chooses 5 heroes for their team and one extra.
                Each captain has 30 seconds for each ban, and 30 for each pick.
                If time runs out during a ban selection, no hero will be banned but if time runs out during a pick selection the slot will remain random.
              </p>
              <p class="blockquote-footer">Inspired by <a href="https://dota2.gamepedia.com/Game_modes#Captains_Mode">Captains Mode</a></p>
            </div>
            <div class="card-footer" style="height: 60px;">
            </div>
          </div>
        </div>
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="@/assets/cake_cutting.png" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Cake Cutting</h5>
              <p class="card-text">
                One divides, One chooses.
                <br />
                The captains pick from a pool of 20 random heroes.
                The captains ban certain heroes, up to 4 per team, preventing either team from picking the hero.
                The captain also take turns chooses five heroes for each pool (A/B).
                The 2 heroes remaining (unpicked/unbanned) are the extras.
                Then there's a random coin toss, the winner can pick a Pool (A/B) or a Side (and hence 1st or 2nd pick) then the other captain picks from the other pair.
                <!--
                20 Random Heroes
                4 Bans (2/Team)
                6 Picks (3/Team) (3/Pool)
                4 Bans (2/Team)
                4 Picks (2/Team) (2/Pool)
                2 Extras
                -->
              </p>
              <p class="blockquote-footer">Submitted by noxville</p>
            </div>
            <div class="card-footer" style="height: 60px;">
            </div>
          </div>
        </div>
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="@/assets/elimination_draft.png" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Elimination</h5>
              <p class="card-text">
                Once a hero is picked they are elimated from future pools.
              </p>
              <p class="blockquote-footer">Submitted by CandianChicken</p>
            </div>
            <div class="card-footer" style="height: 60px;">
            </div>
          </div>
        </div>
        <!--
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="https://via.placeholder.com/200x100?text=Coming+Soon" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Limited Captains Duel</h5>
              <p class="card-text">
                Each team's captain bans three heroes, then they take turns picking five heroes for their team. 
                Heroes are chosen from a pool of 27 random heroes: 9 Strength heroes, 9 Agility heroes, and 9 Intelligence heroes. 
                Each captain has 180 seconds total to make all selections.
              </p>
              <p class="blockquote-footer">Inspired by <a href="https://dota2.gamepedia.com/Game_modes#Captains_Draft">Captains Draft</a></p>
            </div>
            <div class="card-footer" style="height: 60px;">
            </div>
          </div>
        </div>       
        -->
        <!--
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="https://via.placeholder.com/200x100?text=Coming+Soon" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Midas Draft</h5>
              <p class="card-text">
                Vivamus at pharetra metus, a egestas libero. Vestibulum nisl lacus, maximus ac risus vel, tempor placerat augue. Praesent tempor accumsan blandit. Quisque vel turpis at turpis viverra porttitor. Phasellus nec ligula vitae risus commodo mollis. Etiam nisl tortor, ultrices vitae orci vitae, porta sodales nibh. Vivamus rutrum tincidunt risus sed lobortis. Donec ut elit sit amet lectus ullamcorper ullamcorper. Quisque porttitor in urna sed efficitur. Aliquam mollis nec quam eu dictum. Vivamus vel ligula gravida, rutrum lectus nec, feugiat nisl. 
              </p>
              <p class="blockquote-footer">Submitted by Inspired by <a href="https://liquipedia.net/dota2/Midas_Mode/2">Midas Mode</a></p>
            </div>
            <div class="card-footer" style="height: 60px;">
              <a href="#" class="btn btn-primary disabled">Draft</a>
            </div>
          </div>
        </div>
        -->
      </div>
    </div>


    <!--
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home"
  /*
  components: {
    HelloWorld
  }
  */
};
</script>

<style scoped>
.home {
  padding: 4em 0 6em 0;
  text-align: center;
}
</style>
