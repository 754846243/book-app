<template>
  <div class="content-box">
      <div class="content">
        <div class="img">
          <img :src="bookImg">
        </div>
        <div class="information">
          <scroll-x class="scrollX" :fontSize="24">
            <h1>{{bookName}}</h1>
          </scroll-x>
          <h2>作者: <span class="author">{{author}}</span></h2>
          <h2>标签：{{tags}}</h2>
        </div>
        <scroll class="scroll">
          <p>{{bookIntroduction}}</p>
        </scroll>
      </div>
    <div class="button" @click="handle">关闭</div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import ScrollX from 'base/transverse-scroll/transverse-scroll'

export default {
  components: {
    Scroll,
    ScrollX
  },
  props: ['bookImg', 'bookName', 'bookIntroduction', 'author', 'tags'],
  methods: {
    handle () {
      this.$emit('handle')
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
  position: relative;
  top: 39px;
  width: 596px;
  left: 39px;
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
  position: absolute;
  bottom: 39px;
  left: 215px;
}

.img{
  display: inline-block;
  vertical-align: top;
}

img{
  width: 270px;
  height: 383px;
}

.information{
  vertical-align: top;
  margin-left: 72px;
  width:244px;
  height: 383px;
  display: inline-block;
  background: #ffffff;
  z-index: 10
}

h1{
  font-size: 48px;
}

h2{
  vertical-align: top;
  font-size: 24px;
  color: #444444;
  margin-bottom: 14px;
}

p{
  font-size: 30px;
}

.scroll{
  position: fixed;
  top: 621px;
  width: 596px;
  bottom: 222px;
  overflow: hidden;
}

.scrollX{
  position: relative;
  white-space: nowrap;
  margin-top: 113px;
  margin-bottom: 20px;
  overflow: hidden;
}

.author{
  vertical-align: top;
  display: inline-block;
  width: 180px;
}
</style>
