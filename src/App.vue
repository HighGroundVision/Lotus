<template>
  <!-- Header -->
  <header id="header">
    <img class="logo-icon" src="/favicon.ico" style="" />
    <a href="/" class="logo">Lotus</a>
  </header>
  <!-- Nav -->
  <!--
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  -->
  <!-- View -->
  <div id="view">
    <router-view :key="$route.fullPath" />
  </div>
  <!-- Footer -->
  <footer id="footer">
    <div class="inner">
      <h2>Get In Touch</h2>
      <ul class="actions">
        <li>
          <i class="fab fa-twitter"></i>
          <a href="https://twitter.com/dotahgv" target="_blank">@DotaHGV</a>
        </li>
        <li>
          <i class="fab fa-reddit-alien"></i>
          <a href="https://www.reddit.com/r/Abilitydraft/" target="_blank">r/AbilityDraft</a>
        </li>
        <li>
          <i class="fab fa-discord"></i>
          <a href="https://discord.gg/sSFjabV" target="_blank">Chat on Discord</a>
        </li>
        <li>
          <i class="fab fa-github"></i>
          <a href="https://github.com/HighGroundVision" target="_blank">We love Open Source</a>
        </li>
      </ul>
    </div>
    <div class="copyright">
      <a href="http://highgroundvision.com/" target="_blank">
        <img src="@/assets/hgv.jpg" style="border-radius: 50%;" />
      </a>
      <br />
      &copy; 2020 High Ground Vision
    </div>
  </footer>
</template>

<style>
#view {
  background-size: 100%;
  background-position: center top;
  background-repeat: repeat-y;
  background-image: url("~@/assets/banner.jpg");
}
</style>
