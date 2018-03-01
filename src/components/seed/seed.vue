<template>
  <div class="content">
    <v-tab name="我的种子"></v-tab>
    <div class="seed-list">
        <div v-for="seed in seed_datas" v-bind:key="seed.key" class="seed"><div class="seed-border"><p>{{ seed }}</p></div>
        </div>
    </div>
  </div>
</template>

<script>
import VTab from 'components/tab/tab_back'
import {getCookie} from 'js/cookie'

export default {
  data () {
    return {
      seed_datas: ['文学', '科技', '绘本', '历史']
    }
  },
  components: {
    VTab
  },
  mounted () {
    this._getSeed()
  },
  methods: {
    // 如果不是登陆状态，跳转到login页面
    _judgeLogonStatus () {
      console.log(getCookie('token'))
      if (!getCookie('token')) {
        this.$router.push('/login')
      } else {
        this._handleButton()
      }
    },
    _getSeed () {
      const url = 'http://139.199.66.15:5000/api/user/seed'
      var rp_data
      this.$http.get(url).then(function(res) {
        rp_data = res
      })
      return rp_data
    }
  }
}
</script>

<style scoped>
.content{
  position: absolute;
  width: 750px;
}

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

.seed-list{
  display: flex;
  flex-wrap: wrap;
  margin: 45px 0 0 0;
}

.seed{
  flex: 33.33%;
  margin-bottom: 25px;
  justify-content: center;
  align-items: center;
}

.seed-border{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, .25);
  border-radius: 1000px;
  width: 175px;
  height: 172px;
  margin: 0;
}

.seed p{
  font-size: 36px;
}
</style>
