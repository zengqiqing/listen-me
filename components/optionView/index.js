const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Array,
      value: []
    },
    optionModalStatus: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },
  methods: {
    chooseOption(e) {
      const { index } = e.currentTarget.dataset
      this.setData({
        currentIndex: index
      })
    },
    hideOption() {
      this.triggerEvent('hideOption', {}, {})
    }
  }

  
})
