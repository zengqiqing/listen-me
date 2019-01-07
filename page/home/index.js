// bargain/bargainDetail/index.js
import { wxAppId } from '../../util/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOwner: true,
    arr: [
      {isOwner: true, isQuestion: true, isAnonymous: false, nickName: '来接你', text: '这是主人 & 问题,测试文字超过换行是否生效,测试中测试中', iconUrl: '/image/niming.png'},
      {isOwner: false, isQuestion: false, isAnonymous: true, nickName: '发多少', text: '这是客人 & 非问题,测试文字超过换行是否生效,测试中测试中', iconUrl: '/image/niming.png'},
      {isOwner: false, isQuestion: false, isAnonymous: true, nickName: '从v', text: '这是客人 & 非问题,测试文字超过换行是否生效,测试中测试中', iconUrl: '/image/niming.png'},
      {isOwner: false, isQuestion: false, isAnonymous: false, nickName: '对方', text: '这是客人 & 非问题,测试文字超过换行是否生效,测试中测试中', iconUrl: '/image/niming.png'},
      {isOwner: false, isQuestion: false, isAnonymous: true, nickName: '从v', text: '这是客人 & 非问题', iconUrl: '/image/niming.png'},
      {isOwner: false, isQuestion: false, isAnonymous: false, nickName: '对方', text: '这是客人 & 非问题,测试文字超过换行是否生效,测试中测试中', iconUrl: '/image/niming.png'},
      // {isOwner: true, isQuestion: false, isAnonymous: false, nickName: '大飒飒大师傅', text: '这是主人 & 非问题', iconUrl: '/image/niming.png'},
      // {isOwner: true, isQuestion: false, isAnonymous: false, nickName: 'fniensn', text: '这是主人 & 非问题', iconUrl: '/image/niming.png'},
      // {isOwner: false, isQuestion: true, isAnonymous: false, nickName: '不想吃', text: '这是客人 & 问题', iconUrl: '/image/niming.png'},
    ],
    options: [
      '你最想对我说的一句话是什么？', 
      '你对我的第一印象是怎样的？',
      '你想帮我结束单身之旅吗？',
      '说说看，你喜欢我什么？',
      '在你心里我是一个怎样的人？',
      '说出一个镇得住我的异性名字',
      '我眼睛好看，还是嘴巴好看？',
      '你在哪里，为什么还不来找我？',
      '不喜欢我的人不要回复我，哼~',
    ],
    optionModalStatus: false,
    showSharePop:false,//显示分享弹窗
  },
  resetAction() {
    this.setData({
      optionModalStatus: true
    })
  },
  onGotUserInfo(e) {
    const that = this
    const { userInfo } = e.detail
    console.log('----',e)
    app.fetch({
      url: `https://tu.juher.cn/account/v1/minProgram/register?token=${this.token}`,
      data: {userInfo}
    }, 'POST').then(res => {
      console.log('update --', res)
    })
  },
  hideOption() {
    this.setData({
      optionModalStatus: false
    })
  },
  showAnswerBox(){
    this.setData({
      showAnserBoxHome:true
    })
  },
  homeSharePop(){
    this.setData({
      showSharePop:true
    })
  },
  choseImg() {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const { fromUserId='' } = options || {}
    wx.login({
      success: (res) => {
        const { code } = res
        app.fetch({
          url: `https://tu.juher.cn/account/v1/minProgram/login?channelId=miniProgram`,
          data: {
            code,
            fromUserId,
            wxAppId,
          }
        }, 'POST').then(res => {
          // wx.setStorage
          that.token = res.data.token
          that.setData({
            uploadToken: res.data
          })
        })
      }
    })
  },

  onShow: function() {

  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按
    }
    return {
      title: "静听真心话",
      imageUrl: "/image/niming.png",
      path: "page/home/index"
    }
    
  }

})