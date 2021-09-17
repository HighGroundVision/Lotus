<template>
  <div style="margin-bottom: -5px">
    <div style="position: relative; top: 100px; background-color: #591f82; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 10px; padding: 0px; max-width: 800px; width: 100%; margin: auto; margin-top: 0px; display: flex; align-items: center">
      <div style="padding: 20px">
        <div style="font-size: 30px; margin-bottom: 5px"><slot name="title"></slot></div>
        <div style="font-size: 14px; color: rgba(255, 255, 255, 0.5)"><slot name="description"></slot></div>
      </div>
    </div>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" style="width: 100%; height: 100px">
      <path
        class="wavePath2"
        d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
        fill="#191919"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  setup() {},
}
</script>

<style scoped></style>
