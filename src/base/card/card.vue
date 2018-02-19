<template>
  <div class="card" ref="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.$refs.card.style.height = this.height + 'rem'
  }
}
</script>

<style>
.card{
  background: #ffffff;
  width: 710px;
  box-shadow: 1px 0px 1px -1px #c0c2c5, -1px 0px 1px -1px #c0c2c5,
    0px 2px 2px 2px #c0c2c5;
}
</style>
