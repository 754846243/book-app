<template>
  <div class="wrapper" ref="wrapper">
    <div class="box" ref="box">
      <slot></slot>
    </div>
  </div>
</template>

<script  type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: String,
      default: null
    },
    fontSize: {
      type: Number,
      default: 12
    },
    width: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.timer1 = setTimeout(() => {
      console.log(this.width)
      this.$refs.wrapper.style.width = this.width + 'px'
      this._setSliderWidth()
      this._initScroll()
    }, 20)
  },
  methods: {
    _setSliderWidth () {
      let content = this.$refs.box.children[0].innerHTML
      let width = content.length * this.fontSize
      this.$refs.box.style.width = width + 'px'
    },
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollY: false,
        scrollX: true
      })
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data () {
      this.timer2 = setTimeout(() => {
        this._setSliderWidth()
        this.refresh()
      }, 20)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer1)
    clearTimeout(this.timer2)
  }
}
</script>

<style scoped>
.wrapper{
  overflow: hidden;
}
</style>
