<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
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
    }
  },
  mounted () {
    this.timer1 = setTimeout(() => {
      this._initScroll()
    }, 20)
    window.addEventListener('resize', () => {
      this.refresh()
    })
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data () {
      this.timer2 = setTimeout(() => {
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
