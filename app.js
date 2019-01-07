const openIdUrl = require('./config').openIdUrl
// const baseRequestObj = {
//   header: '',
//   url
// }

App({
  onLaunch(opts) {
    console.log('App Launch', opts)
    this.getUserInfo()
  },
  onShow(opts) {
    
  },
  onHide() {
    
  },
  globalData: {
    hasLogin: false,
    openid: null
  },
  //获取数据
  fetch(options, method='GET') {
    return new Promise((resolve, reject) => {
      wx.request({
        url: options.url,
        header: options.header || {
          "content-type": "application/json"
        },
        data: options.data || {},
        method: method,
        dataType: options.dataType || "json",
        success: function (e) {
          console.log('is success e', e)
          resolve(e.data)
        },
        fail: function (e) {
          console.log('is fail e', e)
          reject(e)
          wx.showModal({
            title: "网络请求出错",
            content: e.errMsg,
            success: function (e) {
              t.fail ? t.fail(e):''
            }
          })
        },
        complete: function (e) {
         
        }
      })
    })
  },
  //获取微信用户信息
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: function (res) {
          resolve(res.userInfo)
          var userInfo = res.userInfo;
          // that.setData({
          //   nickName: userInfo.nickName,
          //   avatarUrl: userInfo.avatarUrl,
          // })
        },
        fail: function(e) {
          console.log('拒绝授权获取用户信息')
          reject(e)
        }
      })
    })
  },
  // lazy loading openid
  getUserOpenId(callback) {
    const self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success(data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})
