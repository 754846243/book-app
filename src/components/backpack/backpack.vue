<template>
  <div class="mine">
    <router-link tag="div" to="/seed">
      <card :height="3.84" class="card-one card">
        <div class="img-zone">
          <img src="./seed.png">
        </div>
        <p>我的种子</p>
        <img class="right-arrow" src="./arrow.png">
      </card>
    </router-link>
    <card class="card-two card" :height="3.84">
      <div class="img-zone">
        <img src="./book.png">
      </div>
      <p>我种出的书</p>
      <img class="right-arrow" src="./arrow.png">
    </card>
  </div>
</template>

<script>
import Card from 'base/card/card'

export default {
  components: {
    Card
  }
}

</script>

<style scoped>

.card {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.card-one {
  margin-top: 20px;
  width: 710px;
  height: 288px;
}

.card-one .img-zone img {
  width: 174px;
  height: 100px;
}

.card p {
  font-size: 30px;
  line-height: 38px;
  position: absolute;
  left: 320px;
}

.card-two {
  margin-top: 20px;
  width: 710px;
}

.card-two .img-zone img {
  width: 116px;
  height: 140px;
}

.img-zone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 174px;
  height: 288px;
  margin-left:25px;
}

.right-arrow {
  height: 64px;
  width: 38px;
  margin-right: 40px;
}

</style>
