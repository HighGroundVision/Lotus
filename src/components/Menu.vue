<template>
  <header class="kXRVMW">
    <div style="margin: auto; width: 100%; max-width: 1100px; display: flex; justify-content: space-between; position: relative">
      <a style="height: 45px; line-height: 45px; font-size: 20px" href="/"><span style="border-bottom: 2px solid">hgv.lotus</span></a>
      <div style="display: flex; align-items: center; height: 100%; justify-content: flex-end" class="jjSfOp">
        <router-link to="/hc" style="cursor: pointer; padding: 10px 20px">HC</router-link>
        <router-link to="/bd" style="cursor: pointer; padding: 10px 20px">BD</router-link>
        <router-link to="/ap" style="cursor: pointer; padding: 10px 20px">AP</router-link>
        <router-link to="/sd" style="cursor: pointer; padding: 10px 20px">SD</router-link>
        <router-link to="/cd" style="cursor: pointer; padding: 10px 20px">CD</router-link>
        <router-link to="/" style="cursor: pointer; padding: 10px 20px">CC</router-link>
        <div style="margin-right: 40px"></div>
        <router-link to="/faq" style="cursor: pointer; padding: 10px 20px">FAQ</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
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
</style>
