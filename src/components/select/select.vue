<template>
  <div class="select-component" ref="select">
    <img class="logo" src="../../common/image/plantbooks.png">
    <div v-if="first" ref="first">
      <div class="name">
        <p>输入昵称:</p>
        <input type="text" :value="name">
      </div>
      <p class="title">选择您最感兴趣的类别吧!</p>
      <ul class="selectionList">
        <li class="selection" v-for="(item, index) in selectionList" :key="index" @click="selectCategory(index)">
          {{item.selection}}
        </li>
      </ul>
      <div class="button-wrapper">
        <div class="button" @click="goOn">
          继续
        </div>
      </div>
    </div>
    <div v-else>
      <div class="title">
        <p class="title">选择您最喜欢的一类书吧!</p>
        <h1>{{category.selection}}</h1>
      </div>
      <ul class="selectionList">
        <li class="selection" v-for="(item, index) in optionList" :key="index" @click="selectSCategory(index)">
          {{item}}
        </li>
      </ul>
      <div class="button-wrapper" ref="button">
        <div class="button">
          开启种书之旅
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectionList: [
        {
          id: 0,
          selection: '小说'
        },
        {
          id: 1,
          selection: '文学'
        },
        {
          id: 2,
          selection: '人文社科'
        },
        {
          id: 3,
          selection: '经济管理'
        },
        {
          id: 4,
          selection: '计算机与互联网'
        },
        {
          id: 5,
          selection: '成功励志'
        }
      ],
      name: '',
      first: true,
      category: {},
      optionList: [
        // 假数据
        '文学经典', '散文随笔', '日记书信', '演讲访谈', '传记回忆'],
      sCategory: []
    }
  },
  mounted () {
    this._judgeButton()
  },
  methods: {
    _judgeButton () {
      setTimeout(() => {
        let clientHeight = this.$refs.select.clientHeight
        let availHeight = window.screen.availHeight
        if (clientHeight > availHeight) {
          this.$refs.button.style.marginTop = '-5px'
        } else if (clientHeight > availHeight - 50) {
          this.$refs.button.style.marginTop = '0px'
        }
      }, 20)
    },
    selectCategory (index) {
      let target = this.$refs.first.getElementsByTagName('li')[index]
      if (JSON.stringify(this.category) === '{}') {
        // 当原本所选为空时
        target.style.background = '#47c047'
        target.style.color = '#f2f6f9'
        this.category = this.selectionList[index]
      } else if (this.category === this.selectionList[index]) {
        // 当原本所选和现在所点相同时
        target.style.background = '#f2f6f9'
        target.style.color = '#47c047'
        this.category = {}
      } else {
        // 当选了不止一项时
        console.log('只能选择一项')
      }
    },
    goOn () {
      if (!(JSON.stringify(this.category) === '{}')) {
        this.first = false
        this._judgeButton()
        // 将所选项post出去并且收到数据，暂时没有接口，没有写
      }
    }
  }
}
</script>

<style scoped>
img{
  width: 468px;
  margin: 72px 140px 65px;
}

.selectionList{
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
  padding: 0px 8px;
  justify-content: center;
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
  margin: 0 33px 70px;
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
  margin-top: 55px;
  margin-bottom: -6px;
}
</style>
