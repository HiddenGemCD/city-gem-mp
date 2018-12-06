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
          description: e.detail.value.description,
          address: page.data.address
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
  getPlace: function () {
    var page = this;
    app.getPermission(page); // Enter     that value to set the content directly on the app.js page  
  }
})