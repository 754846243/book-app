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
      type: Array,
      default: null
    },
    fontSize: {
      type: Number,
      default: 12
    }
  },
  mounted () {
    setTimeout(() => {
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
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>

<style scoped>
.wrapper{
  width:244px;
  overflow: hidden;
}
</style>
