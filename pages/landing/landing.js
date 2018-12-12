//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  goNext: function () {
    wx.switchTab({
      url: '/pages/posts/index'
    })
  },

  onLoad: function (options) {
    const host = 'http://localhost:3000/';
    // const host = 'https://citygem.wogengapp.cn/';
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: host + 'api/v1/update_user_info', method: 'post', data:                 {
                  id: app.globalData.userId.id,
                  name: res.userInfo.nickName,
                  city: res.userInfo.city,
                  gender: res.userInfo.gender,
                  avatar: res.userInfo.avatarUrl
                },
                success: res => {
                  console.log("Sucess pass data to rails")
                }
              })
            }
          })
        }
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
