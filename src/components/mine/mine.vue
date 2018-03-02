<template>
  <div class="mine">
    <card :height="3.84" class="card-one card">
      <div class="head-portrait">
        <div class="head" :style="'backgroundImage:url(' + information.headPortrait + ')'">
          <img class="sapling" src="./sapling.png">
          <input type="file" class="file" accept="image" @change="uploadHeadImage">
        </div>
      </div>
      <div class="information">
        <h2 class="name">{{information.name}}</h2>
        <div class="detail">
          <span class="icon">
            <img src="./reading.png">
          </span>
          <span class="reading">
            <p>当前在读：{{information.reading}}</p>
          </span>
        </div>
      </div>
    </card>
    <card class="card-two card" :height="5.866">
      <progress-circle class="circle" :progress="information.progress"></progress-circle>
      <p>种子成长进度</p>
    </card>
    <div class="button-box" ref="button">
      <div class="button button-one" @click="gainSeed">领取种子</div>
      <div class="button button-two" @click="logout">退出登录</div>
    </div>
  </div>
</template>

<script>
import Bus from 'js/bus'
import Card from 'base/card/card'
import ProgressCircle from 'base/progress-circle/progress-circle'
import {deletCookie} from 'js/cookie'
import gainType from 'js/gainType'

export default {
  components: {
    Card,
    ProgressCircle
  },
  data () {
    return {
      information: {
        name: '郑丹妮',
        reading: '文学',
        progress: 0,
        headPortrait: ''
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
      let that = this
      const url = 'http://139.199.66.15:5000/api/user/mine'
      this.$http.get(url).then((res) => {
        if (res.data.code === 5) {
          this.$router.push('/login')
        }
        let data = res.data.user_info
        that.information.progress = parseInt((data.seed_status / 15) * 100)
        that.information.name = data.nick_name
        that.information.reading = gainType(data.first_type)
        that.information.headPortrait = data.head_img_url
      })
      // this.$refs.head.style.background = `url(${this.information.headPortrait})`
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
    _imgPreview (file) {
      let that = this

      // 看支持不支持FileReader
      if (!window.FileReader) return

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          that.headerImage = this.result
          console.log(that.headerImage)
          that._postImg()
        }
      }
    },
    _postImg () {
      // 上传图片
      console.log('post')
      const URL = 'http://139.199.66.15:5000/api/user/head_img'
      this.$http.post(URL, this.headerImage).then((res) => {
        if (res.data.code === 5) {
          this.$router.push('/login')
        }
      })
    },
    logout () {
      deletCookie('cellphone')
      deletCookie('token')
      localStorage.clear()
      this.$router.push('/login')
    },
    uploadHeadImage (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.picValue = files[0]
      this._imgPreview(this.picValue)
    },
    gainSeed () {
      Bus.$emit('isName', false)
      this.$router.push('/select')
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

.file{
  position: absolute;
  display: inline-block;
  background: transparent;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  color: transparent;
  opacity: 0;
}

.information{
  margin-left: 105px;
  width: 256px;
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

.detail .reading{
  margin-left: 5px;
  display: inline-block;
  width: 210px;
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

.button-box{
  margin-top: 165px;
}

.button{
  width: 309px;
  height: 63px;
  border-radius: 31.5px;
  color: #ffffff;
  display: flex;
  font-size: 32px;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 0px 2px -2px #e1e5e7, -2px 0px 2px -2px #e1e5e7,
    0px 5px 5px 5px #d9dde0;
}

.button-one{
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  background: #43bf43;
}

.button-two{
  margin-left: auto;
  margin-right: auto;
  margin-top: 45px;
  background: #ef5353;
}
</style>
