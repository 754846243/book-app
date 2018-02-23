<template>
  <div class="button-wrapper">
    <div class="button" @click="handle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handle () {
      this.$emit('handle')
    }
  }
}
</script>

<style scoped>
.button-wrapper{
  text-align: center;
}

.button{
  z-index: 5;
  display: inline-block;
  height: 80px;
  line-height: 80px;
  padding: 0px 75px;
  background: #43bf43;
  color: #ffffff;
  font-size: 36px;
  border-radius: 50px;
  box-shadow: 2px 0px 2px -2px #e1e5e7, -2px 0px 2px -2px #e1e5e7,
    0px 5px 5px 5px #d9dde0;
}
</style>
