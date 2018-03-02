<template>
  <div class="content" ref="content">
    <v-tab @handle="handle"></v-tab>
      <router-view></router-view>
  </div>
</template>

<script>
import VTab from 'components/tab/tab'
import Bus from 'js/bus'
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
    // 如果不是登陆状态，跳转到login页面
    _judgeLogonStatus () {
      console.log(getCookie('token'))
      if (!getCookie('token')) {
        this.$router.push('/login')
      } else {
        this._handleButton()
      }
    },
    _handleButton () {
      // 监听屏幕的高度和内容块的高度，并传入Bus中，管理我的界面中按钮的高度
      this.timer = setTimeout(() => {
        let clientHeight = this.$refs.content.clientHeight
        let availHeight = window.screen.availHeight
        // let availHeight = document.documentElement.clientHeight
        Bus.$emit('height', clientHeight, availHeight)
      }, 20)
    },
    handle () {
      this._handleButton()
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>
.content{
  position: absolute;
  width: 750px;
}
</style>
