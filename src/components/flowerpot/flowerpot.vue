<template>
  <div class="flowerpot">
    <div v-show="currentPage === 0">
      <img class="flower first" src="./flowerpot.png">
      <div class="button button-one" @click="seedSeed">
        埋下种子
      </div>
      <div class="popup" v-show="popupIsActive">
        <div class="content">
          <img src="./sapling.png">
          <p>您有一颗{{seedCategory}}种子，您想种下它吗？</p>
        </div>
        <div class="option">
          <span class="option-one" @click="yes">是的</span>
          <span class="option-two" @click="no">不，我要留着</span>
        </div>
      </div>
    </div>
    <div v-show="currentPage === 1">
      <div v-if="seedStatus <= 14">
        <img v-show="seedStatus < 6" class="flower first" src="./seed.png">
        <img v-show="seedStatus < 11 && seedStatus >= 6" class="flower second" src="./seedling.png">
        <img v-show="seedStatus >= 11" class="flower third" src="./leaf.png">
        <div class="button button-two" @click="next">成长</div>
      </div>
      <div v-else>
        <img class="flower fourth" src="./bloom.png">
        <div class="button button-two" @click="gain">收获</div>
      </div>
    </div>
    <div v-if="currentPage === 2">
      <content-box @like="addLike" @unlike="nextRecommend" :bookName="bookName" :bookIntroduction="bookIntroduction"
      :author="author">
      </content-box>
    </div>
    <div v-else-if="currentPage === 3">
      <book-box @handle="close" :bookName="bookName" :bookIntroduction="bookIntroduction" :bookImage="bookImage"
      :author="author" :tags="tags"></book-box>
    </div>
    <div class="mask" v-show="popupIsActive"></div>
  </div>
</template>

<script>
import gainType from 'js/gainType'
import ContentBox from 'base/content-box/content-box'
import BookBox from 'base/book-box/book-box'
import Bus from 'js/bus'

export default {
  data () {
    return {
      currentPage: 0,
      popupIsActive: false,
      seedStatus: 0,
      number: 0,
      seedCategory: '',
      bookName: '',
      bookIntroduction: '',
      author: '',
      tags: '',
      bookImage: ''
    }
  },
  components: {
    BookBox,
    ContentBox
  },
  mounted () {
    this._checkSeed()
  },
  methods: {
    _checkSeed () {
      console.log('_checkSeed')
      // 查看自己的所有种子,如果种子里面有status大于1的则跳到喜欢，否则跳到埋下种子
      let url = 'http://139.199.66.15:5000/api/user/seed'
      this.$http.get(url).then((res) => {
        if (res.data.code === 5) {
          this.$router.push('/login')
        }
        if (!res.data.data) {
          // 如果没有种子，跳到选择页面
          this.seedId = false
          return
        }
        let seed = this._handleSeed(res.data.data)
        if (seed) {
          this.seedId = seed.seed_id
          this.seedCategory = gainType(seed.first_type)
          this.seedStatus = seed.status
          this.currentPage = 1
          this.grow()
        } else {
          this._selectSeed(res.data.data)
        }
      })
    },
    _handleSeed (data) {
      console.log('_handleSeed')
      for (let i = 0; i < data.length; ++i) {
        if (data[i].status > 0) return data[i]
      }
      return false
    },
    _selectSeed (data) {
      console.log('_selectSeed')
      // 在自己的所有种子中轮流选择
      const LENGTH = data.length
      if (this.number === LENGTH) {
        this.number = 0
      }
      var categoryId = data[this.number].first_type
      this.seedCategory = gainType(categoryId) // 种子的类别
      this.seedId = data[this.number].seed_id // 种子
      this.seedStatus = Number(data[this.number].status) // 种子当前的状态
    },
    seedSeed () {
      this.popupIsActive = true
      if (!this.seedId) {
        this.popupIsActive = false
        Bus.$emit('isName', false)
        this.$router.push('/select')
      }
    },
    yes () {
      // 确定种植种子
      // 获得书籍的信息
      this.next()
      this.grow()
    },
    grow () {
      console.log('grow')
      let that = this
      const URL = 'http://139.199.66.15:5000/api/seed/book'
      this.$http.post(URL, {'seed_id': this.seedId}).then((res) => {
        if (res.data.code === 5) {
          this.$router.push('/login')
        }
        let data = res.data.data
        console.log(res)
        that.bookName = data.book_name
        that.bookIntroduction = data.introduction
        that.author = data.author
        that.secondType = data.second_type
        this.tags = data.tags
      })
    },
    next () {
      // 页面跳转到下一面，关闭弹窗
      this.popupIsActive = false
      this.currentPage++
    },
    no () {
      // 页面跳转到下一页，下一次点击埋下种子时换成下一粒种子
      this.popupIsActive = false
      this.number++
    },
    addLike () {
      // 点击喜欢时我的喜欢加一
      this.seedStatus++

      const URL = 'http://139.199.66.15:5000/api/seed/grown'
      this.$http.post(URL, {'seed_id': this.seedId, 'second_type': this.secondType}).then((res) => {
        if (res.data.code === 5) {
          this.$router.push('/login')
        }
      })

      this.nextRecommend()
    },
    nextRecommend () {
      // 改变书摘内容
      this.currentPage = 1
      this.grow()
    },
    gain () {
      let url = 'http://139.199.66.15:5000/api/seed/gain'
      let that = this
      console.log(this.seedId)
      this.$http.post(url, {'seed_id': this.seedId}).then((res) => {
        console.log(res)
        if (res.data.code === 5) {
          this.$router.push('/login')
        }
        let data = res.data.data
        that.author = data.author
        that.bookName = data.book_name
        that.bookIntroduction = data.introduction
        that.bookImage = data.book_img_url
        that.seedCategory = this.seedCategory
      })

      this.currentPage = 3
    },
    close () {
      // 回到埋下种子页面
      this.currentPage = 0
    }
  }
}
</script>

<style scoped>
.flower{
  width: 277px;
  margin-left: 236.5px;
}

.first{
  margin-top: 324px;
}

.second{
  margin-top: 302px;
}

.third{
  margin-top: 102px;
}

.fourth{
   margin-top: 72px;
}

.button-one{
  margin-top: 166px;
  width: 277px;
  margin-left: 236.5px;
}

.popup{
  position: fixed;
  top: 360px;
  left: 90px;
  width: 570px;
  height: 313px;
  background: #ffffff;
  border-radius: 60px;
  box-shadow: 0 2px rgba(0, 0, 0, .25);
  z-index: 2;
}

.popup .content{
  width: 570px;
  height: 222px;
  text-align: center;
}

.popup .content img{
  width: 80px;
  margin: 28px 0px 30px;
}

.popup .content p{
  font-size: 30px;
}

.popup .option{
  margin: 0 20px;
}

.popup .option span{
  display: inline-block;
  width: 245px;
  height: 65px;
  border-radius: 50px;
  line-height: 70px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.popup .option .option-one{
  border-right: 1px solid #333333;
  background-color: #43bf43;
}

.popup .option .option-two{
  float: right;
  background-color: #ef5353;
}

.button{
  z-index: 5;
  height: 80px;
  line-height: 80px;
  background: #43bf43;
  color: #ffffff;
  font-size: 36px;
  border-radius: 50px;
  box-shadow: 2px 0px 2px -2px #e1e5e7, -2px 0px 2px -2px #e1e5e7,
    0px 5px 5px 5px #d9dde0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-two{
  margin-top: 166px;
  width: 220px;
  margin-left: 265px;
}

.mask {
  height: 100%;
  width: 100%;
  background-color: rgba(237, 249, 239, .5);
  position: absolute;
  top: 0;
  z-index: 1;
}

</style>
