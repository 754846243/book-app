<template>
  <div class="progress-bar">
    <div class="wrapper left">
      <div class="progress-circle left-circle" ref="leftcircle"></div>
    </div>
    <div class="wrapper right">
      <div class="progress-circle right-circle" ref="rightcircle"></div>
    </div>
    <span>{{progress}}%</span>
  </div>
</template>

<script>
const BASEANGLE = 3.6
const STARTANGLE = 45

export default {
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this._initProgress()
  },
  methods: {
    _initProgress () {
      if (this.progress <= 50) {
        let right = STARTANGLE + this.progress * BASEANGLE
        this.$refs.rightcircle.style.transform = `rotate(${right}deg)`
      } else {
        let left = STARTANGLE + (this.progress - 50) * BASEANGLE
        this.$refs.rightcircle.style.transform = `rotate(225deg)`
        this.$refs.leftcircle.style.transform = `rotate(${left}deg)`
      }
    }
  },
  watch: {
    progress () {
      this._initProgress()
    }
  }
}
</script>

<style scoped>
.progress-bar{
  display: flex;
  flex-direction: row;
  position: relative;
  width: 270px;
  height: 270px;
  align-items: center;
  justify-content: center;
  font-size: 45px;
}

.wrapper{
  top: 0;
  position: absolute;
  width: 135px;
  height: 270px;
  overflow: hidden
}

.left{
  left: 0;
}

.right{
  right: 0;
}

.progress-circle{
  top: 0;
  position: absolute;
  border: 23px solid #009915;
  height: 224px;
  width: 224px;
  border-radius: 112px;
  transform: rotate(45deg);
}

.left-circle{
  top: 0;
  left: 0;
  border-left: 23px solid #e7e7e7;
  border-bottom: 23px solid #e7e7e7;
}

.right-circle{
  right: 0;
  border-right: 23px solid #e7e7e7;
  border-top: 23px solid #e7e7e7;
}
</style>
