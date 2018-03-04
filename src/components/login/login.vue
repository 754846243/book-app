<template>
  <div class="login" ref="login">
      <div>
        <div class="logo">
          <img class="plant-icon" src="../../common/image/plant-icon.png"/>
          <img class="star" src="../../common/image/star.png"/>
          <img class="plantbooks" src="../../common/image/plantbooks.png"/>
        </div>
        <input-box class="cellphone input-box" :imgSrc="cellphone" placeholder="手机号"
        @inputInformation="inputInformation('cellphone', $event)" :type="1">
        </input-box>
        <input-box class="input-box" :imgSrc="securityCode" placeholder="验证码"
        information="点击获取验证码"  @inputInformation="inputInformation('securityCode', $event)"
        @getVerifyingCode="getVerifyingCode" :type="2">
        </input-box>
        <div class="button" @click="verificate">
          登录
        </div>
      </div>
  </div>
</template>

<script>
import InputBox from 'base/inputBox/inputBox'
import {setCookie, getCookie} from 'js/cookie.js'
import Bus from 'js/bus'

export default {
  components: {
    InputBox
  },
  data () {
    return {
      cellphone: require('../../common/image/cell-phone-icon.png'),
      securityCode: require('../../common/image/security-code-icon.png'),
      loginImformation: {
        cellphone: '',
        securityCode: ''
      }
    }
  },
  mounted () {
    this._judgeLogout()
    this._monitorHeight()
  },
  methods: {
    _judgeLogout () {
      if (getCookie('token')) {
        this.$router.push('/content/mine')
      }
    },
    _monitorHeight () {
      // 动态设置content的min-height，确保全部都有背景颜色
      this.timer = setTimeout(() => {
        let height = window.screen.height
        this.$refs.login.style.minHeight = height + 'px'
      }, 20)
    },
    inputInformation (index, information) {
      this.loginImformation[index] = information
    },
    verificate () {
      const url = 'http://139.199.66.15:5000/api/user/login'
      // 登陆
      this.$http.post(url, {'phone_number': this.loginImformation.cellphone, 'code': this.loginImformation.securityCode})
        .then((res) => {
          this.login(res)
        })
    },
    login (res) {
      console.log(res.data)
      var vnew = res.data.new
      var token = res.data.token
      var response = res.data.msg
      console.log(vnew)
      if (response === 'success') {
        // 登陆成功的处理方案
        setCookie('cellphone', this.loginImformation.cellphone)
        setCookie('token', token)
        this.$http.options.headers.Authorization = token
        if (!vnew) {
          this.$router.push('/content/flowerpot')
        } else {
          this.$router.push('/select')
          Bus.$emit('isName', true)
        }
      } else {
        // 登陆失败的处理方案
      }
    },
    getVerifyingCode () {
      // 获取验证码
      const url = 'http://139.199.66.15:5000/api/user/identify'
      this.$http.post(url, {'phone_number': this.loginImformation.cellphone})
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style>
.login {
  position: absolute;
  background: url(../../common/image/background.png) repeat-x;
  background-size: 750px auto;
  width: 750px;
}

.logo {
  position: relative;
  height: 642px;
}

.plant-icon {
  position: absolute;
  width: 406px;
  margin-left: 172px;
  top: 68px;
}

.star {
  position: absolute;
  top: 68px;
  width: 672px;
  margin-left: 39px;
}

.plantbooks {
  position: absolute;
  top: 482px;
  width: 468px;
  margin-left: 141px;
}

.button{
  margin: 100px 0 0px 261px;;
  z-index: 5;
  display: inline-block;
  height: 80px;
  width: 227px;
  line-height: 80px;
  text-align: center;
  background: #43bf43;
  color: #ffffff;
  font-size: 36px;
  border-radius: 50px;
  box-shadow: 2px 0px 2px -2px #bbe473, -2px 0px 2px -2px #bbe473,
    0px 5px 5px 5px #bbe473;
}

.input-box{
  margin-left: auto;
  margin-right: auto;
}

.cellphone{
  margin-bottom: 66px;
}
</style>
