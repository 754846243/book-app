<template>
  <div class="tab">
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
}
</script>

<style scoped>
.tab{
  font-size: 36px;
  display: flex;
  line-height: 88px;
  background: #4caf50;
  color: #ffffff;
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
