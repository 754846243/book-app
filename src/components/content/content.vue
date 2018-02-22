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
      if (!getCookie('cellphone')) {
        this.$router.push('/login')
      } else {
        this._monitorHeight()
        this._handleButton()
      }
    },
    _monitorHeight () {
      // 动态设置content的min-height，确保全部都有背景颜色
      setTimeout(() => {
        let height = window.screen.height
        this.$refs.content.style.minHeight = height + 'px'
      }, 20)
    },
    _handleButton () {
      // 监听屏幕的高度和内容块的高度，并传入Bus中，管理我的界面中按钮的高度
      setTimeout(() => {
        let clientHeight = this.$refs.content.clientHeight
        let availHeight = window.screen.availHeight
        // let availHeight = document.documentElement.clientHeight
        Bus.$emit('height', clientHeight, availHeight)
      }, 20)
    },
    handle () {
      this._handleButton()
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
}
</style>
