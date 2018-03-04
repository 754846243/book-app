<template>
  <div class="content-box">
      <div class="content">
        <scroll-x class="scrollX" :fontSize="24" :data="bookName" :width="260">
          <h1>{{bookName}}</h1>
        </scroll-x>
        <h2>
          <span>作者:</span>
          <scroll-x class="scrollX" :fontSize="15" :data="author" :width="220">
            <span>{{author}}</span>
          </scroll-x>
        </h2>
        <scroll class="scroll" :data="bookIntroduction">
          <p>{{bookIntroduction}}</p>
        </scroll>
      </div>
    <div class="button button-one" @click="handleLike">喜欢</div>
    <div class="button button-two" @click="handleUnlike">不喜欢</div>
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
  props: {
    bookName: {
      type: String,
      default: ''
    },
    bookIntroduction: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    }
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

h1{
  font-size: 48px;
}

span{
  vertical-align: top;
}

h2{
  vertical-align: top;
  font-size: 30px;
  margin-top: 18px;
}

p{
  font-size: 30px;
}

.scroll{
  position: fixed;
  top: 324px;
  left: 70px;
  right: 70px;
  bottom: 221px;
  overflow: hidden;
}

.scrollX{
  position: relative;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}

.content{
  position: fixed;
  top: 160px;
  bottom: 222px;
  left: 70px;
  right: 70px;
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
  margin-left: 65px;
}

.button-two{
  position: absolute;
  bottom: 39px;
  margin-left: 377px;
}
</style>
