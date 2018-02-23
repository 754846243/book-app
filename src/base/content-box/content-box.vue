<template>
  <div class="content-box">
    <scroll>
      <div class="content">
        <slot></slot>
      </div>
    </scroll>
    <div class="button button-one" @click="handleLike">喜欢</div>
    <div class="button button-two" @click="handleUnlike">不喜欢</div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'

export default {
  components: {
    Scroll
  },
  methods: {
    handleLike () {
      this.$emit('like')
    },
    handleUnlike () {
      this.$emit('unlike')
    }
  }
}
</script>

<style scoped>
.content-box{
  position: fixed;
  left: 38px;
  right: 37px;
  top: 123px;
  bottom: 82px;
  background: #ffffff;
  box-shadow: 1px 0px 1px -1px #c0c2c5, -1px 0px 1px -1px #c0c2c5,
    0px 2px 2px 2px #c0c2c5;
}

.content{
  position: fixed;
  top: 160px;
  bottom: 222px;
  left: 68px;
  right: 68px;
}

.button{
  display: inline-block;
  height: 65px;
  width: 244px;
  line-height: 65px;
  text-align: center;
  background: #43bf43;
  color: #ffffff;
  font-size: 36px;
  border-radius: 50px;
  box-shadow: 2px 0px 2px -2px #e1e5e7, -2px 0px 2px -2px #e1e5e7,
    0px 5px 5px 5px #d9dde0;
}

.button-one{
  position: absolute;
  bottom: 39px;
  left: 65px;
}

.button-two{
  position: absolute;
  bottom: 39px;
  right: 65px;
}
</style>
