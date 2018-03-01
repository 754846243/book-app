export default function (categoryId) {
  let optionList = [
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
  ]

  for (var i in optionList) {
    if (categoryId === optionList[i].id) {
      return optionList[i].selection
    }
  }
}
