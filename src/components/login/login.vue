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
        <div class="login-button" @click="verificate">
          <img src="../../common/image/login-button.png">
          <p>登录</p>
        </div>
      </div>
  </div>
</template>

<script>
import InputBox from 'base/inputBox/inputBox'
import {setCookie, getCookie} from 'js/cookie.js'

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
      if (getCookie('cellphone')) {
        this.$router.push('/content')
      }
    },
    _monitorHeight () {
      // 动态设置content的min-height，确保全部都有背景颜色
      setTimeout(() => {
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
      if (!this.loginImformation.cellphone) {
        console.log('手机号不符合标准')
      } else if (!this.loginImformation.securityCode) {
        console.log('验证码为假')
      } else {
        this.$http.post(url, {'phone_number': this.loginImformation.cellphone, 'code': this.loginImformation.securityCode})
          .then((res) => {
            this.login(res)
          })
      }
    },
    login (res) {
      console.log(res)
      res = res.data.msg
      if (res === 'success') {
        // 登陆成功的处理方案
        setCookie('cellphone', this.loginImformation.cellphone)
        this.$router.push('/content')
      } else {
        // 登陆失败的处理方案
      }
    },
    getVerifyingCode () {
      // 获取验证码
      const url = 'http://139.199.66.15:5000/api/user/identify'
      this.$http.post(url, {'phone_number': this.loginImformation.cellphone})
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

.login-button{
  position: relative;
  display: flex;
  width: 240px;
  height: 109.6px;
  margin-top: 84px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
}

.login-button img{
  position: absolute;
  width: 240px;
}

.login-button p{
  display: flex;
  position: absolute;
  font-size: 36px;
}

.input-box{
  margin-left: auto;
  margin-right: auto;
}

.cellphone{
    margin-bottom: 66px;
}
</style>
