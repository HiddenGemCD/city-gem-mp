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
    this.updateUserInfo()
    wx.switchTab({
      url: '/pages/posts/index'
    })
  },

  onLoad: function (options) {
    if (this.data.canIUse == false) {
      console.log('please authorize...')
      wx.openSetting({
        success: (res) => {
          res.authSetting = {
            "scope.userInfo": true,
            "scope.userLocation": true
          }
        }
      })
    }
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#fff2e7',
    })

    this.updateUserInfo();
  },

  getUserInfo: function(e) {
    console.log('get user info....')
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },

  updateUserInfo: function() {
    const host = 'http://localhost:3000/';
    // const host = 'https://citygem.wogengapp.cn/';
    // const host = 'http://citygem.chiwei.fun/';
    console.log('update user info')
    wx.getSetting({
      success(res) {
        console.log(22222,res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(999, res)
              wx.request({
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
  }
})
