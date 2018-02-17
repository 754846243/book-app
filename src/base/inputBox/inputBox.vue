<template>
  <div class="input-box">
    <span class="icon">
      <img :src="imgSrc">
    </span>
    <input type="text" :placeholder="placeholder" @input="inputInformation">
    <span class="information" @click="hanleInformation">
      {{information}}
    </span>
  </div>
</template>

<script>
import {cellphoneVer} from 'js/verification'

export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    information: {
      type: String,
      default: ''
    },
    imgSrc: {
      type: String,
      default: ''
    }
  },
  methods: {
    inputInformation (e) {
      let loginInformation = e.target.value
      if (this.placeholder === '手机号' && (!cellphoneVer(loginInformation))) {
        console.log('不合格')
        // 不合格的处理方案暂时没有
      }
      this.$emit('inputInformation', loginInformation)
    },
    hanleInformation () {
      console.log(1)
      this.$emit('getVerifyingCode')
    }
  }
}
</script>

<style scoped>
.input-box {
  display: flex;
  position: relative;
  align-items: center;
  width: 590px;
  left: 50%;
  margin-left: -295px;
  height: 100px;
  background: white;
  border-radius: 50px;
  vertical-align: super;
  margin-bottom: 66px;
}

input {
  flex-grow: 1;
  line-height: 30px;
  border: 0;
  font-size: 30px;
  width: 200px;
  margin: 20px;
}

.icon{
  flex-grow: 0;
  display: flex;
  height: 60px;
  width: 40px;
  margin: 20px 20px 20px 40px;
  align-items: center
}

.icon img {
  display: flex;
  width: 40px;
}

.information {
  flex-grow: 0;
  display: inline-block;
  width: 100px;
  margin-right: 30px;
  font-size: 24px;
  text-decoration: underline
}
</style>
