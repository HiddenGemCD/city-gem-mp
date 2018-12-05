//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    const host = 'http://localhost:3000/';
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                // pass code to rails login#login, a new user be created by rails
                url: host + 'api/v1/update_user_info', method: 'post', data: {
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
  },
  goNext: function () {
    wx.navigateTo({
      url: '/pages/posts/index'
    })
  },
})
