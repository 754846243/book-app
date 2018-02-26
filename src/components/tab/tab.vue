<template>
  <div class="tab" @click="handle">
    <router-link tag="div" class="tab-item" to="/content/flowerpot">
      <span class="tab-link">花盆</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/content/backpack">
      <span class="tab-link">背包</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/content/mine">
      <span class="tab-link">我的</span>
    </router-link>
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
.tab{
  font-size: 36px;
  display: flex;
  line-height: 88px;
  height: 88px;
  background: #43bf43;
  color: #ffffff !important;
  box-shadow: 0 6px 6px #c0c2c5;
}

.tab-item{
  text-align: center;
  flex-grow: 1;
}

.tab-link{
  display: inline-block;
  width: 182px;
}

.router-link-exact-active .tab-link{
  border-bottom: 4px solid #ffffff;
}
</style>
