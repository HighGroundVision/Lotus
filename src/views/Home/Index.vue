<template>
  <div id="__next">
    <div style="overflow-x: hidden; background: #000">
      <header class="Header__HeaderBox-sc-7tl5ec-3 kXRVMW">
        <div style="margin: auto; width: 100%; max-width: 1100px; display: flex; justify-content: space-between; position: relative">
          <a style="height: 45px; line-height: 45px; font-size: 20px" href="/"><span style="border-bottom: 2px solid">hgv.lotus</span></a>
          <div style="display: flex">
            <div style="display: flex; align-items: center; height: 100%; justify-content: flex-end" class="Header__MenuBox-sc-7tl5ec-4 jjSfOp">
              <!--<a style="cursor: pointer; padding: 10px 20px" href="/faq">FAQ</a>-->
              <!--<router-link to="/faq" style="cursor: pointer; padding: 10px 20px">FAQ</router-link>-->
              <a href="#hc" style="cursor: pointer; padding: 10px 20px">HC</a>
              <a href="#bd" style="cursor: pointer; padding: 10px 20px">BD</a>
              <a href="#ap" style="cursor: pointer; padding: 10px 20px">AP</a>
              <a href="#sd" style="cursor: pointer; padding: 10px 20px">SD</a>
              <a href="#hd" style="cursor: pointer; padding: 10px 20px">HD</a>
              <a href="#cd" style="cursor: pointer; padding: 10px 20px">CD</a>
              <a href="#cc" style="cursor: pointer; padding: 10px 20px">CC</a>
              <div style="margin-right: 20px"></div>
              <router-link to="/faq" style="cursor: pointer; padding: 10px 20px">FAQ</router-link>
            </div>
          </div>
        </div>
      </header>
      <div class="pages__MobileWelcomeBox-sc-1g8c86n-6 bLBTYI">
        <div style="text-shadow: 4px 4px rgba(0, 0, 0, 0.2); font-size: calc(30px + 1vw); font-weight: bold">HGV - Lotus</div>
        <h1 style="text-shadow: 4px 4px rgba(0, 0, 0, 0.2); font-size: calc(15px + 1vw); margin-top: 0; color: rgba(255, 255, 255, 0.8); font-weight: normal">Experimental Drafting Options for Ability Draft Lobbies</h1>
      </div>
      <div class="pages__DontShowOnMobile-sc-1g8c86n-5 ckuZQT">
        <div class="pages__VideoBox-sc-1g8c86n-4 cLtstx">
          <video autoplay="" muted="" loop="" playsinline="" style="width: 100vw">
            <source type="video/webm" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_webm.webm" />
            <source type="video/mp4" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4" />
          </video>
          <div style="position: absolute; display: flex; align-items: center; justify-content: center; flex-direction: column">
            <div style="text-shadow: 4px 4px rgba(0, 0, 0, 0.2); font-size: calc(30px + 1vw); font-weight: bold">HGV - Lotus</div>
            <h1 style="text-shadow: 4px 4px rgba(0, 0, 0, 0.2); font-size: calc(15px + 1vw); margin-top: 0; color: rgba(255, 255, 255, 0.7); font-weight: normal">Experimental Drafting Options for Ability Draft Lobbies</h1>
          </div>
        </div>
        <div style="background: black; height: 120px; margin-top: -120px; width: 100%; clip-path: polygon(0 0%, 100% 80%, 100% 100%, 0 100%)"></div>
      </div>
      <div style="position: relative; background: #000">
        <div style="position: absolute; z-index: 2; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center"></div>
      </div>
      <div style="display: flex; max-width: 1100px; width: 100%; justify-content: space-between; flex-wrap: wrap; margin: auto; margin-top: -180px; z-index: 4; position: relative" class="pages__Main-sc-1g8c86n-10 gdPJFn">
        <div style="padding: 2px; border-radius: 11px; margin-bottom: 20px" class="pages__GradientBox-sc-1g8c86n-15 cqvqpi">
          <div style="display: flex; width: 100%; border-radius: 10px" class="pages__ReplayAnalyzisBox-sc-1g8c86n-0 fDQsWU">
            <div style="border-radius: 9px 0px 0px 9px; margin-right: 2px; position: relative" class="pages__ReplayAnalyzisInnerBox-sc-1g8c86n-1 hhhVXT">
              <div style="position: absolute; right: -30px; font-size: 40px; top: 55px; z-index: 100" class="pages__Finger-sc-1g8c86n-16 bkcanr">
                <div class="cqvqpa" :style="{ '-webkit-mask': 'url(' + require('@/assets/arrow.svg') + ')', mask: 'url(' + require('@/assets/arrow.svg') + ')' }" />
              </div>
              <h2 style="margin: 0; margin-bottom: 10px">Quickly Test a Hero</h2>
              <div style="color: #999; height: 30px; display: flex; align-items: center; margin-top: 4px">
                <div class="pages__Number-sc-1g8c86n-3 aXnnF">1.</div>
                <div>Select the hero</div>
              </div>
              <div style="color: #999; height: 30px; display: flex; align-items: center; margin-top: 4px">
                <div class="pages__Number-sc-1g8c86n-3 aXnnF">2.</div>
                <div>Create the lobby</div>
              </div>
              <div style="color: #999; height: 30px; display: flex; align-items: center; margin-top: 4px">
                <div class="pages__Number-sc-1g8c86n-3 aXnnF">3.</div>
                <div>Start testing 🎉</div>
              </div>
            </div>
            <div style="border-radius: 0px 9px 9px 0px; display: flex; align-items: center; justify-content: center" class="pages__ReplayAnalyzisInnerBox2-sc-1g8c86n-2 iZcrcO">
              <div>
                <div style="padding: 5px; border-radius: 10px; border: 2px solid #646dd0; display: flex">
                  <Multiselect v-model="hero" :options="heroes" class="multiselect-purple" />
                  <div @click="copy" class="pages__GoBtn-sc-1g8c86n-14 jnbrig" data-tooltip="up" aria-label="Copy the commands to clipboard; ready to paste into the Dota console.">
                    <img src="@/assets/copy.svg" />
                  </div>
                  <div @click="start" class="pages__GoBtn-sc-1g8c86n-14 jnbrig" data-tooltip="up" aria-label="Opens Dota via the browser and sets commands via the launch options automaticly.">
                    <img src="@/assets/dota.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex;  flex; align-items: center; justify-content: center" class="pages__ReplayAnalyzisBox-sc-1g8c86n-0 fDQsWU">
          <div style="font-size: 14px; color: #4d749e; margin-top: 10px; font-style: italic">
            These commands disabled the player shuffle, shorten the draft time and sets the hero to the first slot. <br />
            For either option start a custom lobby with the region as LOCALHOST with no bots.
          </div>
        </div>
      </div>

      <!--  Consonle Commands -->
      <div>
        <div style="font-size: 24px; padding: 5px; text-shadow: 2px 2px rgb(0 0 0 / 20%); text-align: center; width: 100%; margin-top: 180px">
          One of the primay reasons we created Lotus was to be quickly setup test for AD <br />
          but these command also unlock experimental drafting strategies for AD.
        </div>

        <div style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 50px; margin-bottom: 50px; display: flex; align-items: center">
          <div style="padding: 20px">
            <div style="font-size: 13px; color: rgba(255, 255, 255, 0.3)">What is this dark magic?</div>
            <div style="font-size: 30px; margin-bottom: 5px"><a href="https://www.reddit.com/r/Abilitydraft/comments/jl4vo9/hero_roaster_for_custom_lobbies/">Console Commands</a></div>
            <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">With the addition of some new console commands to set the hero roster (5 heroes for each team + 2 extras) and some old ones we can create experimental lobbies to test different drafting strategies.</div>
            <div style="font-size: 14px; color: #4d749e; margin-top: 10px; font-style: italic">Got an idea for a new draft strategy send it to us and it could be added to the list for all to enjoy.</div>
          </div>
        </div>
      </div>

      <div style="margin-top: 50px">
        <div style="position: relative; top: 100px; background-color: #591f82; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 0px; max-width: 800px; width: 100%; margin: auto; margin-top: 0px; display: flex; align-items: center">
          <div style="padding: 20px">
            <div style="font-size: 30px; margin-bottom: 5px">Lobby Host</div>
            <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">You can use the following tools as the lobby host to set the roster but you have to select or generate the roster.</div>
          </div>
        </div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            class="wavePath2"
            d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
            fill="#191919"
          ></path>
        </svg>
      </div>
      <div style="background: #191919; margin-top: -5px">
        <div style="max-width: 1100px; width: 100%; margin: auto; padding: 40px 0px; padding-top: 10vh; padding-bottom: 100px">
          <div style="display: flex">
            <div class="pages__ImgBox-sc-1g8c86n-12 cZvBDc">
              <img alt="hero image" style="height: 390px; margin-left: -390px; margin-top: -150px; margin-bottom: -250px" src="https://hyperstone.highgroundvision.com/images/heroes/profile/128.png" />
            </div>
            <div class="pages__InfoBox-sc-1g8c86n-13 dXuGjg">
              <h2 id="hc" style="margin: 0; font-size: 35px; padding: 0px 20px">
                <router-link to="/hc">Host Choice</router-link>
              </h2>
              <p style="font-size: 18px; line-height: 26px; color: #999; padding: 0px 20px">As the lobby host you select the heroes and their team (Radiant/Dire/Extra) to create the roster for the draft. You do not have submit a complete lineup, the remain slots will be random.</p>
              <div style="font-size: 14px; color: #4d749e; margin-top: 10px; margin-left: 20px; font-style: italic">We will often use this method if we have a more complex tests.</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style="margin-top: -40px; background: #191919">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              class="wavePath"
              d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
              fill="#111"
            ></path>
          </svg>
        </div>
        <div style="background: #111; margin-top: -20px">
          <div style="display: flex; max-width: 1100px; width: 100%; justify-content: space-between; flex-wrap: wrap; margin: auto; z-index: 4; position: relative; background: #111">
            <div style="display: flex">
              <div class="pages__InfoBox-sc-1g8c86n-13 dXuGjg">
                <h2 id="bd" style="margin: 0; font-size: 35px; margin-top: 100px; padding: 0px 20px">
                  <router-link to="/bd">Balanced Draft</router-link>
                </h2>
                <p style="font-size: 18px; line-height: 26px; color: #999; padding: 0px 20px">
                  The draft is still randomly generated but there are a number of additional switches to Disqualify Heroes and/or Balance Teams. You can use these switches to create a fair draft or a complete clown festival the choice is yours.
                </p>
                <div style="border-radius: 0px 9px 9px 0px; display: flex; align-items: center; justify-content: center">
                  <div style="padding: 5px; border-radius: 10px; border: 2px solid #646dd0; display: flex">
                    <div class="pages__GoBtn-sc-1g8c86n-14 jnbrig">
                      <router-link to="/bd/?default=speed-draft">Speed Draft</router-link>
                    </div>
                    <div class="pages__GoBtn-sc-1g8c86n-14 jnbrig">
                      <router-link to="/bd/?default=all-intelligence">All Intelligence</router-link>
                    </div>
                    <div class="pages__GoBtn-sc-1g8c86n-14 jnbrig">
                      <router-link to="/bd/?default=hard-mode">Hard Mode</router-link>
                    </div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; justify-content: center">
                  <div style="font-size: 14px; color: #4d749e; margin-top: 10px; font-style: italic">These are quick links to the most popular setups to get you started quickly.</div>
                </div>
              </div>
              <div class="pages__ImgBox-sc-1g8c86n-12 cZvBDc">
                <img alt="hero image" style="height: 400px; margin-right: -330px; transform: scaleX(-1)" src="https://hyperstone.highgroundvision.com/images/heroes/profile/72.png" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 0; background: #111">
        <div style="position: relative; top: 100px; background-color: #591f82; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 0px; max-width: 800px; width: 100%; margin: auto; margin-top: 0px; display: flex; align-items: center">
          <div style="padding: 20px">
            <div style="font-size: 30px; margin-bottom: 5px">Player Participation</div>
            <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">You can use the following tools as the lobby host to set the roster but each player interact with these tools to help create the roster.</div>
          </div>
        </div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            class="wavePath2"
            d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
            fill="#191919"
          ></path>
        </svg>
      </div>

      <div style="background: #191919; margin-top: -5px">
        <div style="max-width: 1100px; width: 100%; margin: auto; padding: 40px 0px; padding-top: 10vh; padding-bottom: 100px">
          <div style="display: flex">
            <div class="pages__ImgBox-sc-1g8c86n-12 cZvBDc">
              <img alt="hero image" style="height: 400px; margin-left: -430px; margin-top: -100px; margin-bottom: -230px" src="https://hyperstone.highgroundvision.com/images/heroes/profile/97.png" />
            </div>
            <div class="pages__InfoBox-sc-1g8c86n-13 dXuGjg">
              <h2 id="ap" style="margin: 0; font-size: 35px; padding: 0px 20px">All Pick</h2>
              <p style="font-size: 18px; line-height: 26px; color: #999; padding: 0px 20px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div style="margin-top: -40px; background: #191919">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path
                class="wavePath"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#111"
              ></path>
            </svg>
          </div>
          <div style="background: #111; margin-top: -20px">
            <div style="display: flex; max-width: 1100px; width: 100%; justify-content: space-between; flex-wrap: wrap; margin: auto; z-index: 4; position: relative; background: #111">
              <div style="display: flex">
                <div class="pages__InfoBox-sc-1g8c86n-13 dXuGjg">
                  <h2 id="sd" style="margin: 0; font-size: 35px; margin-top: 100px; padding: 0px 20px">Single Draft</h2>
                  <p style="font-size: 18px; line-height: 26px; color: #999; padding: 0px 20px">Players pick from a pool of one Strength hero, one Agility hero, and one Intelligence hero where the 3 choices are randomly picked and exclusive to that player. The extra heroes are random.</p>
                  <p style="font-size: 18px; line-height: 26px; color: #999; padding: 0px 20px"></p>
                  <div style="border-radius: 0px 9px 9px 0px; display: flex; align-items: center; justify-content: center">
                    <div style="padding: 5px; border-radius: 10px; border: 2px solid #646dd0; display: flex">
                      <div class="pages__GoBtn-sc-1g8c86n-14 jnbrig">Blind Draft</div>
                      <div class="pages__GoBtn-sc-1g8c86n-14 jnbrig">Open Draft</div>
                    </div>
                  </div>
                </div>
                <div class="pages__ImgBox-sc-1g8c86n-12 cZvBDc">
                  <img alt="hero image" style="height: 400px; margin-right: -530px; margin-top: -40px; margin-bottom: -440px" src="https://hyperstone.highgroundvision.com/images/heroes/profile/123.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 0; background: #111">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            class="wavePath2"
            d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
            fill="#191919"
          ></path>
        </svg>
      </div>

      <div style="background: #191919; margin-top: -5px">
        <div style="max-width: 1100px; width: 100%; margin: auto; padding: 40px 0px; padding-top: 10vh; padding-bottom: 100px">
          <div style="display: flex">
            <div class="pages__ImgBox-sc-1g8c86n-12 cZvBDc">
              <img alt="hero image" style="height: 400px; margin-left: -430px; margin-top: -100px; margin-bottom: -230px" src="https://hyperstone.highgroundvision.com/images/heroes/profile/59.png" />
            </div>
            <div class="pages__InfoBox-sc-1g8c86n-13 dXuGjg">
              <h2 id="hd" style="margin: 0; font-size: 35px; padding: 0px 20px">Horizon Draft</h2>
              <p style="font-size: 18px; line-height: 26px; color: #999; padding: 0px 20px">
                Players pick from a pool of 18 random heroes. There are a number of seconds in the pre-selection phase to review the randomly selected heroes. Then each player gets a few seconds to choose a hero or slot is left random. The extra heroes are random.
              </p>
              <div style="display: flex; align-items: center; justify-content: center">
                <div style="font-size: 14px; color: #ffa233; margin-top: 10px; font-style: italic">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" style="fill: #ffa233">
                    <path
                      d="M11 24h-6v-17h6v17zm-2-4l-2 1v1l2-1v-1zm2-18h10l3 3v1h-5v6h1v3.396c-1.66.085-2.782.652-3 1.604-.131.574.145 1.553 1.12 1.699.665.1 1.325-.24 1.657-.825.335-.661 1.201-.158.932.45-.429 1.023-1.526 1.676-2.709 1.676-1.656 0-3-1.344-3-3 0-1.305.835-2.417 2-2.829v-2.171h1v-6h-14v3h-4v-7h5v-2h6v2zm-2 15l-2 1v1l2-1v-1zm0-3l-2 1v1l2-1v-1zm0-3l-2 1v1l2-1v-1zm0-3l-2 1v1l2-1v-1z"
                    />
                  </svg>
                  <span style="padding-left: 10px; padding-right: 15px">Under Construction</span>
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" style="fill: #ffa233">
                    <path
                      d="M23 23h-22v-1h1v-8h-2v-10h2v-3h5v3h10v-3h5v3h2v10h-2v8h1v1zm-18-9h-1v8h1v-8zm15 0h-1v8h1v-8zm-3 0h-10v8h10v-8zm5-8h-20v6h20v-6zm-17.656 5h-2l1.312-4h2l-1.312 4zm4 0h-2l1.312-4h2l-1.312 4zm4 0h-2l1.312-4h2l-1.312 4zm4 0h-2l1.312-4h2l-1.312 4zm4 0h-2l1.312-4h2l-1.312 4zm-15.344-8h-1v1h1v-1zm15 0h-1v1h1v-1z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: -40px; background: #191919">
        <div style="position: relative; top: 100px; background-color: #591f82; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 0px; max-width: 800px; width: 100%; margin: auto; margin-top: 0px; display: flex; align-items: center">
          <div style="padding: 20px">
            <div style="font-size: 30px; margin-bottom: 5px">Competitive</div>
            <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">You can use the following tools as the lobby host to set the roster but two captions interact with these tools to create the roster.</div>
          </div>
        </div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            class="wavePath"
            d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
            fill="#111"
          ></path>
        </svg>
      </div>
      <div style="background: #111; margin-top: -20px">
        <div style="display: flex; max-width: 1100px; width: 100%; justify-content: space-between; flex-wrap: wrap; margin: auto; z-index: 4; position: relative; background: #111">
          <div style="display: flex">
            <div class="pages__InfoBox-sc-1g8c86n-13 dXuGjg">
              <h2 id="cd" style="margin: 0; font-size: 35px; margin-top: 100px; padding: 0px 20px">Captains Duel</h2>
              <p style="font-size: 18px; line-height: 26px; color: #999; padding: 0px 20px">
                The lobby host populates the pool of available heroes. The captains ban certain heroes preventing either team from picking the hero. The captain also chooses heroes for their team. The host can control the number and sequence for the bans and picks. The host can set the time in
                seconds that are allotted for bans and picks as well as bonus bonus time that can be used throughout any selection. If time runs out during a ban selection, no hero will be banned; if time runs out during a pick selection, a random hero will be chosen.
              </p>
            </div>
            <div class="pages__ImgBox-sc-1g8c86n-12 cZvBDc">
              <img alt="hero image" style="height: 400px; margin-right: -530px; margin-top: -40px; margin-bottom: -440px" src="https://hyperstone.highgroundvision.com/images/heroes/profile/53.png" />
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 0; background: #111">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            class="wavePath2"
            d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
            fill="#191919"
          ></path>
        </svg>
      </div>

      <div style="background: #191919; margin-top: -5px">
        <div style="max-width: 1100px; width: 100%; margin: auto; padding: 40px 0px; padding-top: 10vh; padding-bottom: 100px">
          <div style="display: flex">
            <div class="pages__ImgBox-sc-1g8c86n-12 cZvBDc">
              <img alt="hero image" style="height: 400px; margin-left: -430px; margin-top: -100px; margin-bottom: -230px" src="https://hyperstone.highgroundvision.com/images/heroes/profile/50.png" />
            </div>
            <div class="pages__InfoBox-sc-1g8c86n-13 dXuGjg">
              <h2 id="cc" style="margin: 0; font-size: 35px; padding: 0px 20px">Cake Cutting</h2>
              <p style="font-size: 18px; line-height: 26px; color: #999; padding: 0px 20px">
                One divides, One chooses.
                <br />
                The captains pick from a pool of 20 random heroes. The captains ban certain heroes, up to 4 per team, preventing either team from picking the hero. The captain also take turns chooses five heroes for each pool (A/B). The 2 heroes remaining (unpicked/unbanned) are the extras. Then
                there's a random coin toss, the winner can pick a Pool (A/B) or a Side (and hence 1st or 2nd pick) then the other captain picks from the other pair.
              </p>
              <div style="display: flex; align-items: center; justify-content: center">
                <div style="font-size: 14px; color: #ffa233; margin-top: 10px; font-style: italic">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" style="fill: #ffa233">
                    <path
                      d="M11 24h-6v-17h6v17zm-2-4l-2 1v1l2-1v-1zm2-18h10l3 3v1h-5v6h1v3.396c-1.66.085-2.782.652-3 1.604-.131.574.145 1.553 1.12 1.699.665.1 1.325-.24 1.657-.825.335-.661 1.201-.158.932.45-.429 1.023-1.526 1.676-2.709 1.676-1.656 0-3-1.344-3-3 0-1.305.835-2.417 2-2.829v-2.171h1v-6h-14v3h-4v-7h5v-2h6v2zm-2 15l-2 1v1l2-1v-1zm0-3l-2 1v1l2-1v-1zm0-3l-2 1v1l2-1v-1zm0-3l-2 1v1l2-1v-1z"
                    />
                  </svg>
                  <span style="padding-left: 10px; padding-right: 15px">Under Construction</span>
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" style="fill: #ffa233">
                    <path
                      d="M23 23h-22v-1h1v-8h-2v-10h2v-3h5v3h10v-3h5v3h2v10h-2v8h1v1zm-18-9h-1v8h1v-8zm15 0h-1v8h1v-8zm-3 0h-10v8h10v-8zm5-8h-20v6h20v-6zm-17.656 5h-2l1.312-4h2l-1.312 4zm4 0h-2l1.312-4h2l-1.312 4zm4 0h-2l1.312-4h2l-1.312 4zm4 0h-2l1.312-4h2l-1.312 4zm4 0h-2l1.312-4h2l-1.312 4zm-15.344-8h-1v1h1v-1zm15 0h-1v1h1v-1z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: -40px; background: #191919">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            class="wavePath"
            d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
            fill="#111"
          ></path>
        </svg>
      </div>
      <div style="background: #111; margin-top: -20px">
        <div style="display: flex; max-width: 1100px; width: 100%; justify-content: space-between; flex-wrap: wrap; margin: auto; z-index: 4; position: relative; background: #111"></div>

        <a href="http://ad.datdota.com/" target="_blank" rel="noreferrer noopener" style="border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 30px; max-width: 800px; width: 100%; margin: auto; margin-top: 20px; display: flex; align-items: center">
          <div><img src="https://www.datdota.com/images/logos/datdota_logo_small.png" style="width: 100px" /></div>
          <div style="padding: 20px">
            <div style="font-size: 13px; color: rgba(255, 255, 255, 0.3)">special thanks to</div>
            <div style="font-size: 30px; margin-bottom: 5px">Ability Draft Statistics</div>
            <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)">Check out Ability Draft Statistics to improve and evaluate Ability Draft gameplay: measuring the strength of heroes, guiding your drafting of abilities, and also tracking your performance after games!</div>
            <div style="font-size: 14px; color: #4d749e; margin-top: 10px; font-style: italic">Some of the experiments would not have posible with the data they provide.</div>
          </div>
        </a>
        <br />
      </div>

      <footer>
        <div style="display: flex; background: #111">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" style="position: relative; z-index: 10">
            <path
              class="wavePath2"
              d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
              fill="#591F82"
            ></path>
          </svg>
        </div>
        <div style="position: relative; z-index: 10; background: #591f82; min-height: 390px">
          <div class="Footer__FooterBox-sc-12rya51-1 cREEJR">
            <div style="width: 152px">
              <div style="display: flex; height: 41px; font-size: 30px; border-bottom: 3px solid">hgv.lotus</div>
              <div style="font-size: 14px; margin-top: 3px; text-align: right">© 2020</div>
            </div>
            <div>
              <a href="https://tango.highgroundvision.com/" target="_blank" rel="noreferrer noopener">
                <img src="https://tango.highgroundvision.com/images/image1.png" style="width: 128px; height: 128px; margin-top: -30px" />
                <img src="https://tango.highgroundvision.com/images/image9.png" style="width: 128px; height: 128px; margin-top: -30px" />
              </a>
            </div>
            <div>
              <a href="/faq" class="Footer__Button-sc-12rya51-0 OvJlu">FAQ</a>
              <!--<a href="/en/contact" class="Footer__Button-sc-12rya51-0 OvJlu">Contact</a>-->
            </div>
            <div>
              <a href="https://twitter.com/dotahgv" class="Footer__Button-sc-12rya51-0 OvJlu">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z"
                  />
                </svg>
                <span> @DotaHGV</span>
              </a>
              <a href="https://www.reddit.com/r/Abilitydraft/" class="Footer__Button-sc-12rya51-0 OvJlu">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path
                    d="M14.558 15.827c.097.096.097.253 0 .349-.531.529-1.365.786-2.549.786l-.009-.002-.009.002c-1.185 0-2.018-.257-2.549-.786-.097-.096-.097-.253 0-.349.096-.096.254-.096.351 0 .433.431 1.152.641 2.199.641l.009.002.009-.002c1.046 0 1.765-.21 2.199-.641.095-.097.252-.097.349 0zm-.126-3.814c-.581 0-1.054.471-1.054 1.05 0 .579.473 1.049 1.054 1.049.581 0 1.054-.471 1.054-1.049 0-.579-.473-1.05-1.054-1.05zm-3.806 1.05c0-.579-.473-1.05-1.054-1.05-.581 0-1.055.471-1.055 1.05 0 .579.473 1.049 1.055 1.049.581.001 1.054-.47 1.054-1.049zm13.374-8.063v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-4 6.853c0-.972-.795-1.764-1.772-1.764-.477 0-.908.191-1.227.497-1.207-.794-2.84-1.299-4.647-1.364l.989-3.113 2.677.628-.004.039c0 .795.65 1.442 1.449 1.442.798 0 1.448-.647 1.448-1.442 0-.795-.65-1.442-1.448-1.442-.613 0-1.136.383-1.347.919l-2.886-.676c-.126-.031-.254.042-.293.166l-1.103 3.471c-1.892.023-3.606.532-4.867 1.35-.316-.292-.736-.474-1.2-.474-.975-.001-1.769.79-1.769 1.763 0 .647.355 1.207.878 1.514-.034.188-.057.378-.057.572 0 2.607 3.206 4.728 7.146 4.728 3.941 0 7.146-2.121 7.146-4.728 0-.183-.019-.362-.05-.54.555-.299.937-.876.937-1.546z"
                  />
                </svg>
                <span> r/AbilityDraft</span>
              </a>
              <a href="https://github.com/HighGroundVision" class="Footer__Button-sc-12rya51-0 OvJlu">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"
                  />
                </svg>
                <span> We love Open Source</span>
              </a>
            </div>
          </div>
          <div class="Footer__GabenBox-sc-12rya51-2 fMmwUw" style="color: #fff">
            Dota 2 is a registered trademark of the Valve Corporation.
            <br />
            This website is in no shape or form affiliated with Valve.
            <br />
            All the love to the Ability Draft Community ❤️
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import db from '@/assets/heroes.json'
import Multiselect from '@vueform/multiselect'

export default {
  name: 'Home',
  data() {
    return {
      hero: null,
      heroes: db.slice(0).map((_) => {
        return { value: _.key, label: _.name }
      }),
    }
  },
  components: {
    Multiselect,
  },
  methods: {
    copy() {
      if (this.hero) {
        let cmd = 'dota_gamemode_ability_draft_set_draft_hero_and_team_clear;'
        cmd += 'dota_gamemode_ability_draft_shuffle_draft_order 0;'
        cmd += 'dota_gamemode_ability_draft_per_player_time 1;'
        cmd += 'dota_gamemode_ability_draft_pre_round_time 2;'
        cmd += 'dota_gamemode_ability_draft_pre_time 10;'
        cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team ' + this.hero + ' radiant;'
        cmd += 'dota_gamemode_ability_draft_set_draft_hero_and_team;'
        navigator.clipboard.writeText(cmd)
      }
    },
    start() {
      if (this.hero) {
        let cmd = '-console +dota_gamemode_ability_draft_set_draft_hero_and_team_clear '
        cmd += '+dota_gamemode_ability_draft_shuffle_draft_order 0 '
        cmd += '+dota_gamemode_ability_draft_per_player_time 1 '
        cmd += '+dota_gamemode_ability_draft_pre_round_time 2 '
        cmd += '+dota_gamemode_ability_draft_pre_time 10 '
        cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team ' + this.hero + ' radiant '
        cmd += '+dota_gamemode_ability_draft_set_draft_hero_and_team'
        let params = encodeURIComponent(cmd)
        let url = 'steam://run/570//' + params
        window.open(url)
      }
    },
  },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
/*!sc*/
* {
  box-sizing: border-box;
  font-family: 'Radiance', 'Noto Sans', sans-serif;
}

/*!sc*/
@-webkit-keyframes bk {
  0% {
    background-position-y: -500px;
  }

  100% {
    background-position-y: 0px;
  }
}

/*!sc*/
@-webkit-keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/*!sc*/
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/*!sc*/
.wavePath {
  -webkit-animation: waveDividerAnimation 21s linear infinite alternate;
  -webkit-animation: waveDividerAnimation 21s linear infinite alternate;
  animation: waveDividerAnimation 21s linear infinite alternate;
}

/*!sc*/
.wavePath2 {
  -webkit-animation: waveDividerAnimation 20s linear infinite alternate;
  -webkit-animation: waveDividerAnimation 20s linear infinite alternate;
  animation: waveDividerAnimation 20s linear infinite alternate;
}

/*!sc*/
.animationPaused {
  -webkit-animation-play-state: paused;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

/*!sc*/
@-webkit-keyframes waveDividerAnimation {
  0% {
    d: path(
      'M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z'
    );
  }

  50% {
    d: path(
      'M655.558582,28.4898877 C500.191373,61.6062216 422.833785,83.5422763 266.940085,49.8995879 C112.480383,16.5663637 84.0992497,8.02840272 0,44.7243294 L0,150.727527 L1920,150.727527 L1920,49.8995879 C1580.91676,-34.8808285 1438.10804,73.6768193 1148.0266,38.0019829 C857.945166,2.32714659 810.925791,-4.62644617 655.558582,28.4898877 Z'
    );
  }

  to {
    d: path(
      'M842.322034,38.0019829 C686.954825,71.1183168 623.386282,53.08497 467.492582,19.4422816 C313.032879,-13.8909426 84.0992497,8.02840272 0,44.7243294 L0,150.727527 L1920,150.727527 L1920,76.8685643 C1512.23604,-35.3595639 1568.70222,67.4289432 1278.62078,31.7541069 C988.539347,-3.92072949 997.689243,4.88564905 842.322034,38.0019829 Z'
    );
  }
}

/*!sc*/
@-webkit-keyframes waveDividerAnimation {
  0% {
    d: path(
      'M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z'
    );
  }

  50% {
    d: path(
      'M655.558582,28.4898877 C500.191373,61.6062216 422.833785,83.5422763 266.940085,49.8995879 C112.480383,16.5663637 84.0992497,8.02840272 0,44.7243294 L0,150.727527 L1920,150.727527 L1920,49.8995879 C1580.91676,-34.8808285 1438.10804,73.6768193 1148.0266,38.0019829 C857.945166,2.32714659 810.925791,-4.62644617 655.558582,28.4898877 Z'
    );
  }

  to {
    d: path(
      'M842.322034,38.0019829 C686.954825,71.1183168 623.386282,53.08497 467.492582,19.4422816 C313.032879,-13.8909426 84.0992497,8.02840272 0,44.7243294 L0,150.727527 L1920,150.727527 L1920,76.8685643 C1512.23604,-35.3595639 1568.70222,67.4289432 1278.62078,31.7541069 C988.539347,-3.92072949 997.689243,4.88564905 842.322034,38.0019829 Z'
    );
  }
}

/*!sc*/
@keyframes waveDividerAnimation {
  0% {
    d: path(
      'M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z'
    );
  }

  50% {
    d: path(
      'M655.558582,28.4898877 C500.191373,61.6062216 422.833785,83.5422763 266.940085,49.8995879 C112.480383,16.5663637 84.0992497,8.02840272 0,44.7243294 L0,150.727527 L1920,150.727527 L1920,49.8995879 C1580.91676,-34.8808285 1438.10804,73.6768193 1148.0266,38.0019829 C857.945166,2.32714659 810.925791,-4.62644617 655.558582,28.4898877 Z'
    );
  }

  to {
    d: path(
      'M842.322034,38.0019829 C686.954825,71.1183168 623.386282,53.08497 467.492582,19.4422816 C313.032879,-13.8909426 84.0992497,8.02840272 0,44.7243294 L0,150.727527 L1920,150.727527 L1920,76.8685643 C1512.23604,-35.3595639 1568.70222,67.4289432 1278.62078,31.7541069 C988.539347,-3.92072949 997.689243,4.88564905 842.322034,38.0019829 Z'
    );
  }
}

/*!sc*/
data-styled.g1[id='sc-global-hURbSS1'] {
  content: 'sc-global-hURbSS1,';
}

/*!sc*/
.kXRVMW {
  width: 100%;
  height: 80px;
  border-bottom: 0px;
  padding: 15px;
  z-index: 5;
  position: relative;
  text-shadow: rgb(0 0 0 / 30%) 2px 2px;
}

/*!sc*/
@media (max-width: 1100px) {
  .kXRVMW {
    position: relative !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
  }
}

/*!sc*/
data-styled.g5[id='Header__HeaderBox-sc-7tl5ec-3'] {
  content: 'kXRVMW,';
}

/*!sc*/
.jjSfOp {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

/*!sc*/
@media (max-width: 1100px) {
  .jjSfOp {
    display: none !important;
  }
}

/*!sc*/
data-styled.g6[id='Header__MenuBox-sc-7tl5ec-4'] {
  content: 'jjSfOp,';
}

/*!sc*/
.bIBotx {
  width: 50px;
  height: 50px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 8px 5px;
  cursor: pointer;
  display: none;
}

/*!sc*/
@media (max-width: 1100px) {
  .bIBotx {
    display: -webkit-box !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    display: flex !important;
  }
}

/*!sc*/
data-styled.g7[id='Header__MobileMenuBtn-sc-7tl5ec-5'] {
  content: 'bIBotx,';
}

/*!sc*/
.hHFEHB {
  border-top: 2px solid #222;
  display: none;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background: #000;
  z-index: 999;
  position: fixed;
  top: 80px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 10px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 22px;
}

/*!sc*/
@media (max-width: 1100px) {
  .hHFEHB {
    display: none !important;
  }
}

/*!sc*/
data-styled.g8[id='Header__MobileMenu-sc-7tl5ec-6'] {
  content: 'hHFEHB,';
}

/*!sc*/
.OvJlu {
  border-bottom: 3px solid transparent;
  display: table;
}

/*!sc*/
.OvJlu:hover {
  cursor: pointer;
  border-bottom: 3px solid;
}

/*!sc*/
data-styled.g9[id='Footer__Button-sc-12rya51-0'] {
  content: 'OvJlu,';
}

/*!sc*/
.cREEJR {
  position: relative;
  z-index: 10;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  max-width: 1100px;
  width: 100%;
  margin: auto;
  padding: 40px 0px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 18px;
}

/*!sc*/
@media (max-width: 1100px) {
  .cREEJR {
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 40px 20px;
  }
}

/*!sc*/
data-styled.g10[id='Footer__FooterBox-sc-12rya51-1'] {
  content: 'cREEJR,';
}

/*!sc*/
.fMmwUw {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  max-width: 1100px;
  width: 100%;
  margin: auto;
  padding: 40px 0px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #000000bf;
  font-size: 18px;
  text-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

/*!sc*/
@media (max-width: 1100px) {
  .fMmwUw {
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 40px 20px;
  }
}

/*!sc*/
data-styled.g11[id='Footer__GabenBox-sc-12rya51-2'] {
  content: 'fMmwUw,';
}

/*!sc*/
.fDQsWU {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  border-radius: 10px;
}

/*!sc*/
@media (max-width: 1100px) {
  .fDQsWU {
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}

/*!sc*/
data-styled.g15[id='pages__ReplayAnalyzisBox-sc-1g8c86n-0'] {
  content: 'fDQsWU,';
}

/*!sc*/
.hhhVXT {
  padding: 20px;
  width: calc(50% - 1px);
  background: #000;
  position: relative;
}

/*!sc*/
@media (max-width: 1100px) {
  .hhhVXT {
    width: 100%;
    margin-top: 0px !important;
    border-radius: 9px !important;
  }
}

/*!sc*/
data-styled.g16[id='pages__ReplayAnalyzisInnerBox-sc-1g8c86n-1'] {
  content: 'hhhVXT,';
}

/*!sc*/
.iZcrcO {
  padding: 20px;
  width: calc(50% - 1px);
  background: #000;
  position: relative;
}

/*!sc*/
@media (max-width: 1100px) {
  .iZcrcO {
    width: 100%;
    margin-top: 2px !important;
    border-radius: 9px !important;
  }
}

/*!sc*/
data-styled.g17[id='pages__ReplayAnalyzisInnerBox2-sc-1g8c86n-2'] {
  content: 'iZcrcO,';
}

/*!sc*/
.aXnnF {
  margin-right: 10px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: #000;
  border: 2px solid #444;
  color: #fff;
  border-radius: 5px;
}

/*!sc*/
data-styled.g18[id='pages__Number-sc-1g8c86n-3'] {
  content: 'aXnnF,';
}

/*!sc*/
.cLtstx {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 600px;
  overflow: hidden;
  position: relative;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: -80px;
}

/*!sc*/
@media (max-width: 1100px) {
  .cLtstx {
    height: auto !important;
    margin-top: 0 !important;
  }
}

/*!sc*/
data-styled.g19[id='pages__VideoBox-sc-1g8c86n-4'] {
  content: 'cLtstx,';
}

/*!sc*/
@media (max-width: 1100px) {
  .ckuZQT {
    display: none !important;
  }
}

/*!sc*/
data-styled.g20[id='pages__DontShowOnMobile-sc-1g8c86n-5'] {
  content: 'ckuZQT,';
}

/*!sc*/
.bLBTYI {
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background-size: cover;
  padding: 100px 20px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: none;
}

/*!sc*/
@media (max-width: 1100px) {
  .bLBTYI {
    display: -webkit-box !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    display: flex !important;
  }
}

/*!sc*/
data-styled.g21[id='pages__MobileWelcomeBox-sc-1g8c86n-6'] {
  content: 'bLBTYI,';
}

/*!sc*/
.kvYVYo {
  padding: 30px;
  border-radius: 10px;
  border: 2px solid #591f82;
  font-size: 20px;
  cursor: pointer;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  position: relative;
}

/*!sc*/
.kvYVYo:hover {
  background: #9451c4;
  color: #000;
  z-index: 10;
}

/*!sc*/
.gdPJFn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  max-width: 1100px;
  width: 100%;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: auto;
  margin-top: -80px;
  z-index: 4;
  position: relative;
}

/*!sc*/
@media (max-width: 1100px) {
  .gdPJFn {
    margin-top: -80px !important;
    padding: 20px !important;
  }
}

/*!sc*/
data-styled.g25[id='pages__Main-sc-1g8c86n-10'] {
  content: 'gdPJFn,';
}

/*!sc*/
.hvrSki {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

/*!sc*/
@media (max-width: 1100px) {
  .hvrSki {
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}

/*!sc*/
.cZvBDc {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

/*!sc*/
@media (max-width: 1100px) {
  .cZvBDc {
    display: none !important;
  }
}

/*!sc*/
data-styled.g27[id='pages__ImgBox-sc-1g8c86n-12'] {
  content: 'cZvBDc,';
}

/*!sc*/
@media (max-width: 1100px) {
  .dXuGjg {
    padding-bottom: 100px;
  }
}

/*!sc*/
data-styled.g28[id='pages__InfoBox-sc-1g8c86n-13'] {
  content: 'dXuGjg,';
}

/*!sc*/
.jnbrig {
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

/*!sc*/
data-styled.g29[id='pages__GoBtn-sc-1g8c86n-14'] {
  content: 'jnbrig,';
}

/*!sc*/
.cqvqpa {
  width: 64px;
  height: 64px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
}

.cqvqpi {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
  width: 100%;
}

/*!sc*/
data-styled.g30[id='pages__GradientBox-sc-1g8c86n-15'] {
  content: 'cqvqpi,';
}

/*!sc*/
.bkcanr {
  position: absolute;
  right: -22px;
  font-size: 40px;
  top: 84px;
  z-index: 100;
}

/*!sc*/
@media (max-width: 1100px) {
  .bkcanr {
    display: none !important;
  }
}

/*!sc*/
data-styled.g31[id='pages__Finger-sc-1g8c86n-16'] {
  content: 'bkcanr,';
}

/* tooltip */
[data-tooltip][aria-label] {
  position: relative;
}
[data-tooltip][aria-label]::before {
  content: attr(aria-label);
  pointer-events: none;
  white-space: pre;
  position: absolute;
  color: #fff;
  background: #555;
  padding: 0.3rem 2rem;
  border-radius: 0.3rem;
  opacity: 0;
  visibility: none;
}
[data-tooltip][aria-label]::after {
  content: '';
  pointer-events: none;
  width: 0;
  height: 0;
  position: absolute;
  border-color: #555;
  border-width: 0;
  border-style: solid;
  opacity: 0;
  visibility: none;
}
[data-tooltip^='up'][aria-label]::before {
  bottom: calc(0.5rem + 100%);
  right: 50%;
  transform: translateX(50%);
}
[data-tooltip^='up'][aria-label]::after {
  border-top-width: 0.5rem;
  border-right-width: 0.5rem;
  border-right-color: #0000;
  border-left-width: 0.5rem;
  border-left-color: #0000;
  bottom: 100%;
  right: 50%;
  transform: translateX(50%);
}
[data-tooltip^='down'][aria-label]::before {
  top: calc(0.5rem + 100%);
  right: 50%;
  transform: translateX(50%);
}
[data-tooltip^='down'][aria-label]::after {
  border-bottom-width: 0.5rem;
  border-right-width: 0.5rem;
  border-right-color: #0000;
  border-left-width: 0.5rem;
  border-left-color: #0000;
  top: 100%;
  right: 50%;
  transform: translateX(50%);
}
[data-tooltip^='left'][aria-label]::before {
  right: calc(1rem + 100%);
  bottom: 50%;
  transform: translateY(50%);
}
[data-tooltip^='left'][aria-label]::after {
  border-left-width: 0.5rem;
  border-top-width: 0.5rem;
  border-top-color: #0000;
  border-bottom-width: 0.5rem;
  border-bottom-color: #0000;
  bottom: 50%;
  right: calc(0.5rem + 100%);
  transform: translateY(50%);
}
[data-tooltip^='right'][aria-label]::before {
  left: calc(1rem + 100%);
  bottom: 50%;
  transform: translateY(50%);
}
[data-tooltip^='right'][aria-label]::after {
  border-right-width: 0.5rem;
  border-top-width: 0.5rem;
  border-top-color: #0000;
  border-bottom-width: 0.5rem;
  border-bottom-color: #0000;
  bottom: 50%;
  left: calc(0.5rem + 100%);
  transform: translateY(50%);
}
[data-tooltip][aria-label]:hover::before,
[data-tooltip][aria-label]:hover::after {
  visibility: visible;
  opacity: 1;
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}
[data-tooltip$='100'][aria-label]:hover::before,
[data-tooltip$='100'][aria-label]:hover::after {
  transition-delay: 0.1s;
}
[data-tooltip$='500'][aria-label]:hover::before,
[data-tooltip$='500'][aria-label]:hover::after {
  transition-delay: 0.5s;
}
[data-tooltip$='1000'][aria-label]:hover::before,
[data-tooltip$='1000'][aria-label]:hover::after {
  transition-delay: 1s;
}
.multiselect-purple {
  min-width: 200px;
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
