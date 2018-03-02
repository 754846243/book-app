<template>
  <div class="book">
    <v-tab name="背包"></v-tab>
    <div v-show="catalog">
      <card v-for="(item, index) in bookInformationList" :height="3.8" class="card" :key="index">
        <img class="book-img" :style="'backgroundImage: url(' + item.bookImg + ')'">
        <div class="name">
        <h1>{{item.bookName}}</h1>
        </div>
        <span class="arrow-wapper" @click="enterDetail(index)">
        <img class="arrow" src="../../common/image/arrow.png">
        </span>
      </card>
    </div>
    <div v-show="!catalog">
      <book-box @handle="close" :bookName="bookName" :bookIntroduction="bookIntroduction" :bookImage="bookImg"
      :author="author" :tags="bookType"></book-box>
    </div>
  </div>
</template>

<script>
import VTab from 'components/tab/tab_back'
import Card from 'base/card/card'
import gainType from 'js/gainType'
import BookBox from 'base/book-box/book-box'

export default {
  components: {
    Card,
    BookBox,
    VTab
  },
  data () {
    return {
      bookInformationList: [],
      catalog: true,
      bookName: '',
      bookIntroduction: '',
      bookImg: '',
      author: '',
      bookType: '',
      curentIndex: 0
    }
  },
  mounted () {
    this._gainData()
  },
  methods: {
    _gainData () {
      let url = 'http://139.199.66.15:5000/api/user/gains'
      this.$http.get(url).then((res) => {
        if (res.data.code === 5) {
          this.$router.push('/login')
        }
        let data = res.data.data
        this._handleData(data)
      })
    },
    _handleData (data) {
      for (let i in data) {
        let author = data[i].book.author
        let bookImg = data[i].book.book_img_url
        let bookName = data[i].book.book_name
        console.log(bookName)
        let bookType = gainType(data[i].first_type)
        let bookIntroduction = data[i].book.introduction
        this.bookInformationList.push(
          {'author': author, 'bookImg': bookImg, 'bookName': bookName, 'bookType': bookType, 'bookIntroduction': bookIntroduction})
      }
    },
    enterDetail (index) {
      this.author = this.bookInformationList[index].author
      this.bookImg = this.bookInformationList[index].bookImg
      this.bookName = this.bookInformationList[index].bookName
      this.bookType = this.bookInformationList[index].bookType
      this.bookIntroduction = this.bookInformationList[index].bookIntroduction
      this.catalog = !this.catalog
    },
    close () {
      this.catalog = !this.catalog
    }
  }
}
</script>

<style scoped>
.card{
  margin: 20px auto;
}

.book-img{
  width: 154px;
  height: 218px;
  margin: 34px 88px 42px 56px;
  vertical-align: top;
}

.name{
  position: relative;
  display: inline-block;
  height: 288px;
  width: 238px;
  vertical-align: top;
}

h1{
  font-size: 36px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.arrow{
  width: 38px;
  height: auto !important;
  margin-top: 110px;
  margin-left: 82px;
}
</style>
