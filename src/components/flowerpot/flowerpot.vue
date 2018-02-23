<template>
  <div class="flowerpot">
    <div v-if="currentPage === 0">
      <img class="flower first" src="./flowerpot.png">
      <div class="button-wrapper button-one">
        <div class="button" @click="seedSeed">
          埋下种子
        </div>
      </div>
      <div class="popup" v-show="popupIsActive">
        <div class="content">
          <img src="./sapling.png">
          <p>您有一颗{{category}}种子，您想种下它吗？</p>
        </div>
        <div class="option">
          <span class="option-one" @click="next">是的</span>
          <span class="option-two" @click="no">不，我要留着</span>
        </div>
      </div>
    </div>
    <div v-else-if="currentPage === 1">
      <div v-if="myLike < 14">
        <img v-show="myLike < 5" class="flower first" src="./seed.png">
        <img v-show="myLike < 10 && myLike >= 5" class="flower second" src="./seedling.png">
        <img v-show="myLike < 14 && myLike >= 10" class="flower third" src="./leaf.png">
        <img v-show="myLike === 14" class="flower fourth" src="./bloom.png">
        <div class="button-wrapper button-two">
          <div class="button" @click="next">成长</div>
        </div>
      </div>
      <div v-else>
        <img v-show="myLike === 14" class="flower fourth" src="./bloom.png">
        <div class="button-wrapper button-two">
          <div class="button" @click="gain">收获</div>
        </div>
      </div>
    </div>
    <div v-else-if="currentPage === 2">
      <content-box @like="addLike" @unlike="nextRecommend">
        <!-- 文摘内容 -->
      </content-box>
    </div>
  </div>
</template>

<script>
import ContentBox from 'base/content-box/content-box'

export default {
  data () {
    return {
      currentPage: 0,
      popupIsActive: false,
      category: '文学',
      myLike: 0
    }
  },
  components: {
    ContentBox
  },
  methods: {
    seedSeed () {
      this.popupIsActive = true
    },
    next () {
      this.currentPage++
    },
    no () {
      this.popupIsActive = false
    },
    addLike () {
      this.myLike++
      this.nextRecommend()
    },
    nextRecommend () {
      // 改变书摘内容
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.flower{
  width: 277px;
  margin-left: 236.5px;
}

.first{
  margin-top: 324px;
}

.second{
  margin-top: 302px;
}

.third{
  margin-top: 102px;
}

.fourth{
   margin-top: 72px;
}

.button-one, button-two{
  margin-top: 166px;
}

.popup{
  position: fixed;
  top: 360px;
  left: 124px;
  width: 502px;
  height: 311px;
  background: #ffffff;
}

.popup .content{
  width: 502px;
  height: 222px;
  text-align: center;
  border-bottom: 1px solid #333333;
}

.popup .content img{
  width: 80px;
  margin: 28px 0px 38px;
}

.popup .content p{
  font-size: 30px;
}

.popup .option span{
  display: inline-block;
  width: 245px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  font-size: 30px;
}

.popup .option .option-one{
  border-right: 1px solid #333333;
}

.button-wrapper{
  text-align: center;
}

.button{
  z-index: 5;
  display: inline-block;
  height: 80px;
  line-height: 80px;
  padding: 0px 75px;
  background: #43bf43;
  color: #ffffff;
  font-size: 36px;
  border-radius: 50px;
  box-shadow: 2px 0px 2px -2px #e1e5e7, -2px 0px 2px -2px #e1e5e7,
    0px 5px 5px 5px #d9dde0;
}

.button-two{
  margin-top: 166px;
}
</style>
