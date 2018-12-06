const app = getApp()
const myRequest = require('../../lib/api/request');

Page({
  data: {
    name: 'Choose Location'
    
  },
  // Form Submit Button
  onLoad: function () {
    console.log("loading gb data for create")
  },

  bindSubmit: function (e) {
    console.log("submit..")
    let page = this;
    wx.showToast({ title: 'Sending...', icon: 'loading', duration: 1000 })
    // Post new card to API
    myRequest.post({
      path: 'users/' + app.globalData.userId.id + '/posts',
      data: {
        post: {
          // name: e.detail.value.name,
          name: page.data.name,
          description: e.detail.value.description
        }
      },
      success(res) {
        console.log(res)
      }
    });

    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/posts/mypost'
      })
    }, 1000)
  },
  openSetting: function () {
    wx.getSetting({
      success(res) {
        console.log(22, res)
      }
    })
  },

  grantAuthorizeLocation: function () {
    var that = this;
    app.getPermission(that); 
    wx.getSetting({
      success(res) {
        console.log(22, res)
      }
    })
    wx.getSetting({
      success(res) {
        console.log(22, res)
      }
    })
    let page = this
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        console.log(33, res)
        wx.chooseLocation({
          success: function (res) {
            console.log(44, res)
            page.setData({ 
              name: res.name,
              address: res.address,
              latitude: res.latitude,
              longitude: res.longitude
             })
            // console.log(page.data)
          },
        })
      },
      fail(err) {
        console.log(44, err)
      }
    })
  },

  getPlace: function () {
    var page = this;
    app.getPermission(page); // Enter     that value to set the content directly on the app.js page  
  }
})