<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
