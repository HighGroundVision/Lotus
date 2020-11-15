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
              <p>Nullam ut tortor et massa tempor hendrerit et ac turpis. Ut ac ultrices dui. Quisque ultricies sed leo et vehicula. Phasellus quis elit molestie, feugiat urna quis, pretium ante. Etiam vel risus in nunc sollicitudin rhoncus sit amet sed risus. Suspendisse id mollis ligula. Fusce ut condimentum libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis consequat diam diam, et ultrices felis blandit ac. Sed nec libero ac nibh imperdiet maximus ut id est. Nunc ut felis convallis, porta lacus eget, cursus leo.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="@/assets/admin.png" alt="Admin Tool">
            <div class="card-body">
              <h5 class="card-title">Host Choice</h5>
              <p class="card-text">Select heroes to generate the commands need to set the hero roster.</p>
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
                The draft is still randomly generated but a number of additional rules can be switched on to ensure balanced heroes on each side. The extra heroes are random.
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
              <h3>Casual Lobby</h3>
              <p>In pretium tellus massa, eget elementum metus porttitor id. Fusce odio dolor, molestie sit amet interdum mattis, efficitur non mi. Nunc a sem non urna blandit tempus et et justo. Etiam scelerisque suscipit turpis, eget ullamcorper ex ullamcorper quis. Vivamus sodales lobortis tortor, sed sollicitudin lacus egestas sit amet. Nulla nec diam eleifend, lacinia magna nec, faucibus tellus. Maecenas blandit tristique ex, in euismod turpis volutpat non. Nam fringilla odio non euismod eleifend.</p>
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
              <a href="#" class="btn btn-primary disabled">Draft</a>
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
                There is a 15 seconds pre-selection phase to review the randomly selected heroes.
                Then each player gets 5 seconds to choose a hero or slot is left random.
                The extra heroes are random.
              </p>
              <p class="blockquote-footer">Submitted by HorizoN</p>
            </div>
            <div class="card-footer" style="height: 60px;">
              <a href="#" class="btn btn-primary disabled">Draft</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <h3>Tournament Lobby</h3>
              <p>Cras tincidunt a sapien et volutpat. Curabitur fringilla posuere tortor, non molestie eros aliquet nec. Nunc eget congue metus. Donec quis massa fermentum, mollis ante sit amet, maximus dolor. Cras non nisi at ipsum imperdiet posuere vitae eget lectus. Vestibulum ac faucibus lacus. Proin placerat neque vel cursus efficitur. Sed non tincidunt velit. Nulla sed blandit tellus, sit amet dapibus libero. Aenean fringilla at lectus non aliquet.</p>
            </div>
          </div>
        </div>
      </div>
       <div class="row" style="margin-bottom: 2em;">
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="https://via.placeholder.com/200x100?text=Coming+Soon" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Captains Duel</h5>
              <p class="card-text">
                The captains ban certain heroes, up to seven per team, preventing either team from picking the hero. 
                The captain also chooses five heroes for their team and one extra.
                Each captain has 30 seconds for each ban, and 30 for each pick.
                If time runs out during a ban selection, no hero will be banned buy if time runs out during a pick selection the slot will remain random.
              </p>
              <p class="blockquote-footer">Inspired by <a href="https://dota2.gamepedia.com/Game_modes#Captains_Mode">Captains Mode</a></p>
            </div>
            <div class="card-footer" style="height: 60px;">
            </div>
          </div>
        </div>
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
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="https://via.placeholder.com/200x100?text=Coming+Soon" alt="Card image cap">
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
        <div class="col-xl-4" style="padding-bottom: 20px;">
          <div class="card" style="height: 100%;">
            <img class="card-img-top" src="https://via.placeholder.com/200x100?text=Coming+Soon" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Cake Cutting</h5>
              <p class="card-text">
                One divides, One chooses.
                <br />
                20 heroes available as a random subset of the available pool.
                Ability pool are the 10 picked heroes + 2 unpicked/unbanned heroes spells then there's a random coin toss, the winner can pick Pool A, or Pool B, or Radiant + FP, or Dire + SP
                <!--
                so it could be 20 heroes available as a random subset of the available pool

                Team 1 bans any hero
                Team 2 bans any hero
                Team 1 bans any hero
                Team 2 bans any hero

                Team 1 picks a hero for pool A
                Team 2 picks a hero for pool A
                Team 2 picks a hero for pool B
                Team 1 picks a hero for pool B
                Team 1 picks a hero for pool A
                Team 2 picks a hero for pool B

                Team 2 bans a hero
                Team 1 bans a hero
                Team 2 bans a hero
                Team 1 bans a hero

                Team 2 picks a hero for Pool A
                Team 1 picks a hero for Pool B
                Team 1 picks a hero for Pool A
                Team 2 picks a hero for Pool B

                (2 heroes remaining)

                ability pool are the 10 picked heroes + 2 unpicked/unbanned heroes spells
                then there's a random coin toss, the winner can pick Pool A, or Pool B, or Radiant + FP, or Dire + SP
                -->
              </p>
              <p class="blockquote-footer">Submitted by noxville</p>
            </div>
            <div class="card-footer" style="height: 60px;">
            </div>
          </div>
        </div>
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

<style>
.home {
  padding: 4em 0 6em 0;
  text-align: center;
}
</style>
