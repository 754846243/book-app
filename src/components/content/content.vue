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
