<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/content/backpack">
      <img class="arrow" src="./arrow.png">
    </router-link>
    <p class="headline">我的种子</p>
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
  justify-content: center;
  align-items: center;
  line-height: 88px;
  height: 88px;
  background: #43bf43;
  color: #ffffff !important;
  box-shadow: 0 6px 6px #c0c2c5;
}

.tab-item{
  margin-left: 20px;
}

.headline{
  margin: auto;
  font-size: 36px;
  color: #fff;
}

.tab-link{
  display: inline-block;
}

.arrow {
  height: 33px;
  width: 22px;
}

</style>
