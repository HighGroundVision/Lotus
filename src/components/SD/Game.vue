<template>
  <div></div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('sd')

export default {
  setup() {},
  computed: {
    ...mapState(['G', 'ctx', 'isActive', 'isConnected', 'log', 'matchId', 'playerId']),
  },
}
</script>

<style scoped></style>
