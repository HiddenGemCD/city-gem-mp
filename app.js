//app.js
App({
  onLaunch: function () {
    const host = 'http://localhost:3000/';
    // const host = 'https://citygem.wogengapp.cn/';
    console.log('processing to login');
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        wx.request({
          // pass code to rails login#login, a new user be created by rails
          url: host + 'api/v1/login', method: 'post', data: {
            code: res.code
          },
          success: res => {
            console.log(res.data.userId)
            this.globalData.userId = res.data.userId
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },

  getPermission: function (obj) {
    wx.chooseLocation({
      success: function (res) {
        if (res.name != "") {
          obj.setData({
            name: res.name,
            address: res.address,
            latitude: res.latitude,
            longitude: res.longitude
          })
        }
        console.log(44, res)
      },
      fail: function () {
        wx.getSetting({
          success: function (res) {
            var status = res.authSetting;
            if (!status['scope.userLocation']) {
              wx.showModal({
                title: 'Authorize the current location',
                content: 'Need to get your location, please confirm the authorization, otherwise the map function will not be available',
                success: function (tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function (data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: 'Success',
                            icon: 'success',
                            duration: 1000
                          })

                          wx.chooseLocation({
                            success: function (res) {
                              if (res.name != "") {
                                obj.setData({
                                  name: res.name,
                                  address: res.address,
                                  latitude: res.latitude,
                                  longitude: res.longitude
                                })
                              }
                              console.log(44, res)
                            },
                          })
                        } else {
                          wx.showToast({
                            title: 'Failure',
                            icon: 'success',
                            duration: 1000
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: 'Failed',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  }
})