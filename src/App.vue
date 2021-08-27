<template>
  <router-view />
</template>

<style>
@font-face {
  font-family: 'Radiance';
  src: url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance.eot');
  src: url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance.eot?#iefix') format('embedded-opentype'), url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance.woff') format('woff'),
    url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance.ttf') format('truetype'), url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance.svg#ywftsvg') format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Radiance';
  src: url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-bold.eot');
  src: url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-bold.eot?#iefix') format('embedded-opentype'), url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-bold.woff') format('woff'),
    url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-bold.ttf') format('truetype'), url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-bold.svg#ywftsvg') format('svg');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Radiance';
  src: url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-semibold.eot');
  src: url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-semibold.eot?#iefix') format('embedded-opentype'), url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-semibold.woff') format('woff'),
    url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-semibold.ttf') format('truetype'), url('https://cdn.cloudflare.steamstatic.com/apps/dota2/fonts/radiance-semibold.svg#ywftsvg') format('svg');
  font-weight: 700;
  font-style: normal;
}

html,
body {
  padding: 0;
  margin: 0;
  background: #000;
  color: #fff;
}

hr {
  border: rgb(89, 31, 130) 2px dashed;
}

/*!sc*/
a {
  color: inherit;
  -webkit-text-decoration: none;
  text-decoration: none;
}

/*!sc*/
* {
  box-sizing: border-box;
  font-family: 'Radiance', 'Noto Sans', sans-serif;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(0deg, rgb(89, 31, 130) 0%, rgb(255, 165, 0) 100%);
}

::-webkit-scrollbar-thumb {
  background: transparent;
  box-shadow: 0px 0px 0px 100000vh #222;
}
</style>
