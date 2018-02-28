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
      <div v-if="myLike < 14">
        <img v-show="myLike < 5" class="flower first" src="./seed.png">
        <img v-show="myLike < 10 && myLike >= 5" class="flower second" src="./seedling.png">
        <img v-show="myLike < 14 && myLike >= 10" class="flower third" src="./leaf.png">
        <img v-show="myLike === 14" class="flower fourth" src="./bloom.png">
        <div class="button button-two" @click="next">成长</div>
      </div>
      <div v-else>
        <img v-show="myLike === 14" class="flower fourth" src="./bloom.png">
        <div class="button button-two" @click="gain">收获</div>
      </div>
    </div>
    <div v-if="currentPage === 2">
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
      number: 0,
      seedCategory: ''
    }
  },
  components: {
    BookBox,
    ContentBox
  },
  mounted () {
    setTimeout(() => {
      if (!localStorage.getItem('seedCategory')) {
        // 如果没有seedId则查看当前的所有种子
        console.log(localStorage.getItem('seedCategory'))
        this._checkSeed()
      } else {
        // 得到种子的id和种子的类别
        this.seedId = localStorage.getItem('seedId')
        this.seedCategory = localStorage.getItem('seedCategory')
        this.currentPage = 1
      }
    }, 20)
  },
  methods: {
    _checkSeed () {
      // 查看自己的所有种子
      let url = 'http://139.199.66.15:5000/api/user/seed'
      this.$http.get(url).then((res) => {
        this._handleSeed(res.data.data)
      })
    },
    _handleSeed (data) {
      // 在自己的所有种子中轮流选择
      const LENGTH = data.length
      if (this.number === LENGTH) {
        this.number = 0
      }
      var categoryId = data[this.number].first_type
      this.seedCategory = this._gaincategory(categoryId) // 种子的类别
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
    _writeBookInformation (data) {
      localStorage.setItem('bookImg', data.book_img_url)
      localStorage.setItem('bookName', data.book_name)
      localStorage.setItem('bookIntroduction', data.introduction)
      localStorage.setItem('bookCategory', this.seedCategory)
      localStorage.setItem('author', data.author)
    },
    seedSeed () {
      this.popupIsActive = true
    },
    yes () {
      // 确定种植种子

      // 保存已经种植的种子信息，供重新打开页面时使用
      localStorage.setItem('seedCategory', this.seedCategory)
      localStorage.setItem('seedId', this.seedId)

      // 获得书籍的信息
      let that = this
      const URL = 'http://139.199.66.15:5000/api/seed/book'
      this.$http.post(URL, {'seed_id': this.seedId}).then((res) => {
        console.log(res.data.data)
        that._writeBookInformation(res.data.data)
        localStorage.setItem('bookId', res.data.data.book_id)
        localStorage.setItem('secondType', res.data.data.second_type)
        // that.grow()
      })

      this.next()
      // this._deletSeed()
    },
    _deletSeed () {
      // 删除种子
      const URL = 'http://139.199.66.15:5000/api/seed/remove'
      this.$http.post(URL, {'seed_id': this.seedId}).then((res) => {
        console.log(res)
      })
    },
    next () {
      // 页面跳转到下一面，关闭弹窗
      this.currentPage++
      this.popupIsActive = false
    },
    grow () {
      // 种子成长时的信息
      const URL = 'http://139.199.66.15:5000/api/seed/grown'
      let secondType = localStorage.getItem('secondType')
      this.$http.post(URL, {'seed_id': this.seedId, 'second_type': secondType}).then((res) => {
        console.log(res)
      })
    },
    no () {
      // 页面跳转到下一页，下一次点击埋下种子时换成下一粒种子
      this.popupIsActive = false
      this.number++
    },
    addLike () {
      // 点击喜欢时我的喜欢加一
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

.button-one{
  margin-top: 166px;
  width: 277px;
  margin-left: 236.5px;
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
</style>
