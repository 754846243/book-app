<template>
  <div class="select-component" ref="select">
    <img class="logo" src="../../common/image/plantbooks.png">
    <div class="name" v-if="hasName">
      <p>输入昵称:</p>
      <input type="text" :value="name" @input="inputName">
    </div>
    <div class="title">
      <p class="title">选择您最喜欢的一类书吧!</p>
    </div>
    <div v-show="firstpage">
      <ul class="selectionList">
        <li class="selection" v-for="(item, index) in optionListOne" :key="index" @click="selectCategory(index,'one')" ref="optionOne">
          {{item.selection}}
        </li>
      </ul>
      <div class="nextpage" @click="nextPage">下一页 ></div>
    </div>
    <div v-show="!firstpage">
      <ul class="selectionList">
        <li class="selection" v-for="(item, index) in optionListTwo" :key="index" @click="selectCategory(index,'two')" ref="optionTwo">
          {{item.selection}}
        </li>
      </ul>
      <div class="nextpage" @click="nextPage">下一页 ></div>
      <div class="button" ref="button" @click="plantbooks">
        开启种书之旅
      </div>
    </div>
  </div>
</template>

<script>
import {getCookie} from 'js/cookie'
import Bus from 'js/bus'

export default {
  data () {
    return {
      optionListOne: [
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
        }
      ],
      optionListTwo: [
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
      name: '',
      category: {},
      sCategory: [],
      firstpage: true,
      hasName: false
    }
  },
  mounted () {
    this._judgeButton()
    this.timer1 = setTimeout(() => {
      getCookie('token')
      Bus.$on('isName', hasName => {
        this.hasName = hasName
      })
    }, 20)
  },
  methods: {
    _judgeButton () {
      this.timer2 = setTimeout(() => {
        let clientHeight = this.$refs.select.clientHeight
        let availHeight = window.screen.availHeight
        if (clientHeight > availHeight) {
          this.$refs.button.style.marginTop = '0px'
        } else if (clientHeight > availHeight - 50) {
          this.$refs.button.style.marginTop = '50px'
        }
      }, 20)
    },
    inputName (e) {
      this.name = e.target.value
    },
    selectCategory (index, oneOrTwo) {
      let target
      if (oneOrTwo === 'one') {
        target = this.$refs.optionOne[index]
      } else if (oneOrTwo === 'two') {
        target = this.$refs.optionTwo[index]
      }
      if (JSON.stringify(this.category) === '{}') {
        // 当原本所选为空时
        target.style.background = '#47c047'
        target.style.color = '#f2f6f9'
        if (oneOrTwo === 'one') {
          this.category = this.optionListOne[index]
          console.log('one')
        } else if (oneOrTwo === 'two') {
          this.category = this.optionListTwo[index]
          console.log('two')
        }
      } else if (this.category === this.optionListOne[index] || this.category === this.optionListTwo[index]) {
        // 当原本所选和现在所点相同时
        target.style.background = '#f2f6f9'
        target.style.color = '#333333'
        this.category = {}
      } else {
        // 当选了不止一项时
        console.log('不止选择了一项')
      }
    },
    nextPage () {
      this.firstpage = !this.firstpage
    },
    plantbooks () {
      let url = 'http://139.199.66.15:5000/api/book/seed'
      if (JSON.stringify(this.category) !== '{}') {
        console.log(this.category.id)
        if (!this.hasName) {
          this.$http.post(url, {'first_type': this.category.id}).then((res) => {
            if (res.data.code === 5) {
              this.$router.push('/login')
            }
          })
          this.$router.push('/content/flowerpot')
        } else {
          if (this.name) {
            this.$http.post(url, {'first_type': this.category.id, 'nick_name': this.name}).then((res) => {
              if (res.data.code === 5) {
                this.$router.push('/login')
              }
            })
            this.$router.push('/content/flowerpot')
          }
        }
      }
    }
  },
  beforeDestroy () {
    Bus.$off('isName')
    clearTimeout(this.timer1)
    clearTimeout(this.timer2)
  }
}
</script>

<style scoped>
img{
  width: 468px;
  height: auto;
  margin: 72px 140px 65px;
}

.selectionList{
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
  padding: 0px 8px;
  justify-content: left;
}

.selection{
  text-align: center;
  width: 173px;
  height: 173px;
  border: 2px solid #47c047;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  margin: 0 33px 64px;
}

.name{
  padding-left: 210px;
  margin-bottom: 111px;
}

.name p{
  font-size: 36px;
  display: inline;
}

.name input{
  width: 155px;
  line-height: 40px;
  font-size: 36px;
  border-bottom: 2px solid #333333;
  border-top: transparent;
  border-right: transparent;
  border-left: transparent;
  background: #f2f6f9;
  outline:none
}

p.title{
  font-size: 50px;
  text-align: center;
}

.title{
  margin-top: 12px;
}

h1{
  text-align: center;
  font-weight: normal;
  font-size: 72px;
  text-align: center;
  margin: 55px 0 -6px 0;
}

.nextpage{
  margin: -16px 0 0 590px;
  right: 38px;
  font-size: 30px;
}

.button{
  margin: 148px 0 0px 205px;;
  z-index: 5;
  display: inline-block;
  height: 80px;
  width: 340px;
  line-height: 80px;
  text-align: center;
  background: #43bf43;
  color: #ffffff;
  font-size: 36px;
  border-radius: 50px;
  box-shadow: 2px 0px 2px -2px #e1e5e7, -2px 0px 2px -2px #e1e5e7,
    0px 5px 5px 5px #d9dde0;
}
</style>
