<template>
  <div class="content">
    <v-tab></v-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import VTab from 'components/tab/tab'

export default {
  components: {
    VTab
  }
}
</script>

<style scoped>
.content{
  position: absolute;
  background: #f2f6f9;
  z-index: -1;
  width: 750px;
  height: 100%;
}
</style>
