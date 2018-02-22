<template>
  <div class="select-component" ref="select">
    <img class="logo" src="../../common/image/plantbooks.png">
    <div class="name">
      <p>输入昵称:</p>
      <input type="text" :value="name">
    </div>
    <p class="title">选择你最喜欢的一类书吧!</p>
    <ul class="selectionList">
      <li class="selection" v-for="(item, index) in selectionList" :key="index">
        {{item.selection}}
      </li>
    </ul>
    <div class="button" ref="button">继续</div>
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
      name: ''
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
          console.log(0)
          this.$refs.button.style.marginTop = '-15px'
        } else if (clientHeight > availHeight - 50) {
          this.$refs.button.style.marginTop = '0px'
        }
      }, 20)
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
  padding: 0px 40px;
  justify-content: space-between;
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
  margin-bottom: 70px;
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
}

.title{
  font-size: 50px;
  text-align: center;
}

.button{
  width: 227px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 36px;
  background: #43bf43;
  color: #ffffff;
  border-radius: 50px;
  margin: 103px auto 0px auto;
}
</style>
