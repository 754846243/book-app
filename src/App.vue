<template>
  <div id="app" ref="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    _monitorHeight () {
      // 动态设置min-height，确保全部都有背景颜色
      this.timer = setTimeout(() => {
        let height = window.screen.availHeight
        this.$refs.app.style.minHeight = height + 'px'
      }, 20)
    }
  },
  mounted () {
    this._monitorHeight()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style>
@font-face{
    font-family: 'regular';
    src : url('common/fonts/PingFang-Regular.ttf');
}

*{
  margin: 0;
  padding: 0;
  font-family: 'regular';
}

p, h1, h2, h3, h4, h5, h6{
  color: #333333;
  font-weight: normal;
}

#app{
  background: #f2f6f9;
  width: 750px;
}
</style>
