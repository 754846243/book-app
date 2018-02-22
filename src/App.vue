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
      setTimeout(() => {
        let height = window.screen.height
        this.$refs.app.style.minHeight = height + 'px'
      }, 20)
    }
  },
  mounted () {
    this._monitorHeight()
  }
}
</script>

<style>
@font-face{
    font-family: 'regular';
    src : url('common/fonts/PingFang-Regular.ttf');
}

@font-face{
    font-family: 'bold';
    src : url('common/fonts/PingFang-Bold.ttf');
}

@font-face{
    font-family: 'light';
    src : url('common/fonts/PingFang-Light.ttf');
}

*{
  margin: 0;
  padding: 0;
  font-family: 'regular';
  color: #333333;
}

#app{
  background: #f2f6f9;
  width: 750px;
}
</style>
