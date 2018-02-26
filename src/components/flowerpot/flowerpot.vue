<template>
  <div class="flowerpot">
    <div v-if="currentPage === 0">
      <img class="flower first" src="./flowerpot.png">
      <div class="button-wrapper button-one">
        <div class="button" @click="seedSeed">
          埋下种子
        </div>
      </div>
      <div class="popup" v-show="popupIsActive">
        <div class="content">
          <img src="./sapling.png">
          <p>您有一颗{{category}}种子，您想种下它吗？</p>
        </div>
        <div class="option">
          <span class="option-one" @click="yes">是的</span>
          <span class="option-two" @click="no">不，我要留着</span>
        </div>
      </div>
    </div>
    <div v-else-if="currentPage === 1">
      <div v-if="myLike < 14">
        <img v-show="myLike < 5" class="flower first" src="./seed.png">
        <img v-show="myLike < 10 && myLike >= 5" class="flower second" src="./seedling.png">
        <img v-show="myLike < 14 && myLike >= 10" class="flower third" src="./leaf.png">
        <img v-show="myLike === 14" class="flower fourth" src="./bloom.png">
        <div class="button-wrapper button-two">
          <div class="button" @click="next">成长</div>
        </div>
      </div>
      <div v-else>
        <img v-show="myLike === 14" class="flower fourth" src="./bloom.png">
        <div class="button-wrapper button-two">
          <div class="button" @click="gain">收获</div>
        </div>
      </div>
    </div>
    <div v-else-if="currentPage === 2">
      <content-box @like="addLike" @unlike="nextRecommend">
        <!-- 文摘内容 -->
      </content-box>
    </div>
    <div v-else-if="currentPage === 3">
      <book-box @handle="close"></book-box>
    </div>
  </div>
</template>

<script>
import ContentBox from 'base/content-box/content-box'
import BookBox from 'base/book-box/book-box'

export default {
  data () {
    return {
      currentPage: 0,
      popupIsActive: false,
      category: '',
      myLike: 14,
      optionList: [
        {
          id: 100,
          selection: '小说'
        },
        {
          id: 101,
          selection: '文学'
        },
        {
          id: 107,
          selection: '生活'
        },
        {
          id: 103,
          selection: '经济管理'
        },
        {
          id: 104,
          selection: '科技科普'
        },
        {
          id: 106,
          selection: '成功励志'
        },
        {
          id: 2,
          selection: '杂志'
        },
        {
          id: 102,
          selection: '人文社科'
        },
        {
          id: 108,
          selection: '少儿'
        },
        {
          id: 109,
          selection: '艺术设计'
        },
        {
          id: 105,
          selection: '计算机与互联网'
        },
        {
          id: 110,
          selection: '漫画绘本'
        },
        {
          id: 111,
          selection: '教育考试'
        }
      ],
      number: 0
    }
  },
  components: {
    BookBox,
    ContentBox
  },
  mounted () {
    setTimeout(() => {
      this._checkSeed()
    }, 20)
  },
  methods: {
    _checkSeed () {
      let url = 'http://139.199.66.15:5000/api/user/seed'
      this.$http.get(url).then((res) => {
        this._handleSeed(res.data.data)
      })
    },
    _handleSeed (data) {
      const LENGTH = data.length
      if (this.number === LENGTH) {
        this.number = 0
      }
      var categoryId = data[this.number].first_type
      this.category = this._gaincategory(categoryId) // 种子的类别
      this.seedId = data[this.number].seed_id // 种子
      this.seedStatus = data[this.number].status // 种子当前的状态
    },
    _gaincategory (categoryId) {
      // 通过从后端获得first_type获得种子的类别
      for (var i in this.optionList) {
        if (categoryId === this.optionList[i].id) {
          return this.optionList[i].selection
        }
      }
    },
    _writeBookInformation (img, name, introduction, category) {
      localStorage.setItem('bookImg', img)
      localStorage.setItem('bookName', name)
      localStorage.setItem('bookIntroduction', introduction)
      localStorage.setItem('category', category)
    },
    seedSeed () {
      this.popupIsActive = true
    },
    yes () {
      // 种子种植
      let that = this
      const URL = 'http://139.199.66.15:5000/api/seed/book'
      this.$http.post(URL, {'seed_id': this.seedId}).then((res) => {
        console.log(res.data)
        that.second_type = res.data.data.second_type
        that.bookImg = res.data.data.book_img_url
        that.bookName = res.data.data.book_name
        that.bookIntroduction = res.data.data.introduction
        that._writeBookInformation(that.bookImg, that.bookName, that.bookIntroduction, that.category)
        // this.grow()
      })
      that.next()
    },
    next () {
      this.currentPage++
      this.popupIsActive = false
    },
    grow () {
      // 种子成长时的信息
      const URL = 'http://139.199.66.15:5000/api/seed/grown'
      console.log(this.seedId)
      console.log(this.second_type)
      this.$http.post(URL, {'seed_id': this.seedId, 'second_type': this.second_type}).then((res) => {
        console.log(res)
      })
    },
    no () {
      this.popupIsActive = false
      this.number++
    },
    addLike () {
      this.myLike++
      this.nextRecommend()
    },
    nextRecommend () {
      // 改变书摘内容
      this.currentPage = 1
    },
    gain () {
      this.currentPage = 3
    },
    close () {
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

.button-one, button-two{
  margin-top: 166px;
}

.popup{
  position: fixed;
  top: 360px;
  left: 124px;
  width: 502px;
  height: 311px;
  background: #ffffff;
}

.popup .content{
  width: 502px;
  height: 222px;
  text-align: center;
  border-bottom: 1px solid #333333;
}

.popup .content img{
  width: 80px;
  margin: 28px 0px 38px;
}

.popup .content p{
  font-size: 30px;
}

.popup .option span{
  display: inline-block;
  width: 245px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  font-size: 30px;
}

.popup .option .option-one{
  border-right: 1px solid #333333;
}

.button-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
}

.button{
  z-index: 5;
  height: 80px;
  line-height: 80px;
  padding: 0px 75px;
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
}
</style>
