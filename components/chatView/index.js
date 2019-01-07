const app = getApp()
const obj = {
  0: '',
  1: '',
}
const array = [
  // {
  //   direction: 'flex-column-reverse',
  //   triangle: 'down',
  //   triangleStyle: 'top:95px;right:20rpx'
  // }, { 
  //   direction: 'flex-reverse',
  //   triangle: 'right',
  //   triangleStyle: 'right:90rpx'
  // }, 
  {
    direction: 'flex-column',
    triangle: 'down',
    triangleStyle: 'margin-top:-24rpx;left:-30rpx'
  }, {
    direction: 'flex-row',
    triangle: 'left',

    triangleStyle: 'left:22rpx'
  }
]
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function(value) {
        const { isOwner, isQuestion } = value
        let number = 0
        if(isQuestion) {           //主人&问题
          number = 0
        }else {
          number = 1
        }
        this.setData({
          directionObj: array[number],
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    directionObj: {},
    showAnswerBox:false,//匿名/撩他回复框
  },
  methods: {
    //展示名称
    showName(){
      this.triggerEvent('showName', {}, {})
   },

    //回复他/撩他
    answerVisitor(e){
      let answerstate = e.currentTarget.dataset.answerstate
      this.setData({
        answerstate:answerstate,
        showAnswerBox:true
      })
      this.triggerEvent('answerVisitor', {}, {})
    }
  }

  
})
