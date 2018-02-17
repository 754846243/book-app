<template>
  <div class="login">
    <scroll class="scroll" ref="scroll">
      <div>
        <div class="logo">
          <img class="plant-icon" src="../../common/image/plant-icon.png"/>
          <img class="star" src="../../common/image/star.png"/>
          <img class="plantbooks" src="../../common/image/plantbooks.png"/>
        </div>
        <input-box class="cellphone" :imgSrc="cellphone" placeholder="手机号"
        @inputInformation="inputInformation('cellphone', $event)">
        </input-box>
        <input-box class="securitycode" :imgSrc="securityCode" placeholder="验证码"
        information="点击获取验证码"  @inputInformation="inputInformation('securityCode', $event)"
        @getVerifyingCode="getVerifyingCode">
        </input-box>
        <div class="login-button" @click="verificate">
          <img src="../../common/image/login-button.png">
          <p>登录</p>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import InputBox from 'base/inputBox/inputBox'
import Scroll from 'base/scroll/scroll'
import {setCookie} from 'js/cookie.js'

export default {
  components: {
    InputBox,
    Scroll
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
  methods: {
    inputInformation (index, information) {
      this.loginImformation[index] = information
    },
    verificate () {
      // 登陆
      const url = 'http://139.199.66.15:5000/api/user/login'
      this.$http.post(url, {'phone_numbe': this.loginImformation.cellphone, 'code': this.loginImformation.securityCode})
        .then((res) => {
          this.login(res)
        })
    },
    login (res) {
      res = res.data.msg
      if (res === 'success') {
        // 登陆成功的处理方案
        setCookie('cellphone', this.loginImformation.cellphone)
      } else {
        // 登陆失败的处理方案
      }
    },
    getVerifyingCode () {
      // 获取验证码
      const url = 'http://139.199.66.15:5000/api/user/register'
      this.$http.post(url, {'phone_number': this.loginImformation.cellphone})
    }
  }
}
</script>

<style>
.login {
  position: fixed;
  background: url(../../common/image/background.png) repeat-x;
  width: 100%;
  height: 100%;
}

.scroll{
  position: fixed;
  height: 100%;
  width: 100%
}

.logo {
  position: relative;
  height: 642px;
}

.plant-icon {
  position: absolute;
  width: 406px;
  left: 50%;
  margin-left: -203px;
  top: 68px;
}

.star {
  position: absolute;
  top: 68px;
  width: 672px;
  left: 50%;
  margin-left: -336px;
}

.plantbooks {
  position: absolute;
  top: 482px;
  height: 52px;
  left: 50%;
  margin-left: -234px;
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
</style>
