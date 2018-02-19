<template>
  <div class="content">
    <v-tab></v-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import VTab from 'components/tab/tab'
import {getCookie} from 'js/cookie'

export default {
  components: {
    VTab
  },
  mounted () {
    // 获取数据后，在设置图片，需要更改
    this._judgeLogonStatus()
  },
  methods: {
    _judgeLogonStatus () {
      if (!getCookie('cellphone')) {
        this.$router.push('/login')
      }
    }
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
