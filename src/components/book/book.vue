<template>
  <div class="book">
    <card :height="3.8" class="card">
      <img class="book-img">
      <div class="name">
      <h1></h1>
      </div>
      <img class="arrow" src="common/image/arrow.png">
    </card>
  </div>
</template>

<script>
import Card from 'base/card/card'

export default {
  components: {
    Card
  },
  mounted () {
    this._gainData()
  },
  _gainData () {
    let url = 'http://139.199.66.15:5000/api/user/gains'
    this.$http.get(url).then((res) => {
      let data = res.data.data
      console.log(data)
    })
  }
}
</script>

<style scoped>
card{
  padding: 34px 42px 33px 56px;
}

.book-img{
  width: 154px;
  height: 218px;
}

.name{
  height: 218px;
  line-height: 218px;
  width: 238px;
}

.arrow{
  width: 38px;
  height: auto !important;
}
</style>
