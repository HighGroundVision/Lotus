<template>
  <div class="home">
    <button id="login" @click="login">Login</button>
    <button id="api" @click="api">Call API</button>
    <button id="logout" @click="logout">Logout</button>

    <pre id="results"></pre>
  </div>
</template>

<script>
// @ is an alias to /src
import mgr from '@/services/security.js'

export default {
  name: 'home',
   methods: {
    login: function() {
      mgr.signinRedirect();
    },
    api: function() {
      mgr.getUser().then(function (user) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", "https://api.highgroundvision.com/echo/get");
          xhr.onload = function () {
              console.log(xhr.status, JSON.parse(xhr.responseText));
          }
          xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
          xhr.send();
          
      });
    },
    logout: function() {
        mgr.signoutRedirect();
    }
  }
}
</script>