<template>
  <div class="button" ref="button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$refs.button.style.background = this.color
  }
}
</script>

<style scoped>
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
</style>
