<template>
  <div class="mine">
    <card :height="3.84" class="card-one card">
      <div class="head-portrait">
        <div class="head" ref="head">
          <img class="sapling" src="./sapling.png">
        </div>
      </div>
      <div class="information">
        <h2 class="name">{{information.name}}</h2>
        <div class="detail">
          <span class="icon">
            <img src="./reading.png">
          </span>
          <p>当前在读：{{information.reading}}</p>
          </div>
        <div class="detail">
          <span class="icon">
            <img src="./mark.png">
          </span>
          <p>兴趣标签：{{information.mark}}</p>
          </div>
      </div>
    </card>
    <card class="card-two card" :height="5.866">
      <progress-circle class="circle" :progress="information.progress"></progress-circle>
      <p>种子成长进度</p>
    </card>
    <div class="button" ref="button">
      <v-button color="#43bf43" class="button-one">领取种子</v-button>
      <v-button color="#ef5353" class="button-two" @handle="logout">退出登录</v-button>
    </div>
  </div>
</template>

<script>
import Bus from 'js/bus'
import Card from 'base/card/card'
import VButton from 'base/button/button'
import ProgressCircle from 'base/progress-circle/progress-circle'
import {deletCookie} from 'js/cookie'

export default {
  components: {
    Card,
    VButton,
    ProgressCircle
  },
  data () {
    return {
      information: {
        name: '郑丹妮',
        reading: '文学',
        mark: '文学史',
        progress: 0,
        headPortrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519055748057&di=6bfaeba671d1740b66a76376b1525804&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ff9198618367adab40ec3ee5c81d4b31c8701e49a.jpg'
      }
    }
  },
  mounted () {
    // 获取数据后，在设置图片，需要更改
    this._gainInformation()
    this._handleButton()
  },
  methods: {
    _gainInformation () {
      // 获取数据
      this.$refs.head.style.background = `url(${this.information.headPortrait})`
    },
    _handleButton () {
      // 获取屏幕的高度和内容块的高度，并根据此改变css
      Bus.$on('height', (clientHeight, availHeight) => {
        if (clientHeight > availHeight) {
          // 当内容块的高度高于屏幕的高度后，将按钮往上移
          this.$refs.button.style.margin = '0.6rem'
        }
      })
    },
    logout () {
      deletCookie('cellphone')
      console.log(document.cookie)
      this.$router.push('/login')
    }
  },
  beforeDestroy () {
    Bus.$off('height')
  }
}
</script>

<style scoped>
.card{
  margin-left: auto;
  margin-right: auto;
}

.card-one{
  margin-top: 20px;
  width: 710px;
  height: 288px;
}

.head-portrait{
  display: inline-block;
  width: 284px;
  height: 288px;
}

.head-portrait .head{
  position: relative;
  width: 200px;
  height: 200px;
  border: 6px solid #463233;
  border-radius: 50%;
  margin-left: 36px;
  margin-top: 62px;
  background-size: 2.6666rem 2.6666rem !important;
}

.head-portrait .head .sapling{
  position: absolute;
  width: 79px;
  top: -60px;
  left: 50px;
}

.information{
  margin-left: 105px;
  position: relative;
  display: inline-block;
  height: 288px;
  top: 0;
  vertical-align: top;
}

.name{
  margin-top: 51px;
  font-size: 32px;
  margin-bottom: 38px;
}

.detail{
  margin-bottom: 25px;
}

.card-one p{
  display: inline;
  font-size: 24px;
  line-height: 38px;
  vertical-align: top;
}

.icon img{
  height: 38px;
  width: 32px;
  vertical-align: top;
}

.card-two{
  margin-top: 20px;
  width: 710px;
  height: 440px;
  padding-top: 22px;
  text-align: center;
}

.circle{
  margin-left: auto;
  margin-right: auto;
}

.card-two p{
  font-size: 54px;
  margin-top: 40px;
}

.button{
  margin-top: 165px;
}

.button-one{
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
}

.button-two{
  margin-left: auto;
  margin-right: auto;
  margin-top: 45px;
}
</style>
