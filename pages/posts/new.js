const app = getApp()
const myRequest = require('../../lib/api/request');

Page({
  data: {
    categories: ['Eat', 'Drink', 'Play'],
    current_category: 'Category',
    name: 'Select Location',
    array: ['Eat', 'Drink', 'Play'],
    index: 0,
  },

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
          name: page.data.name,
          description: e.detail.value.description,
          address: page.data.address,
          latitude: page.data.latitude,
          longitude: page.data.longitude,
          category: page.data.current_category,
          tagstring: e.detail.value.tagstring
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

  getPlace: function () {
    var page = this;
    app.getPermission(page);
  },
  
  bindPickerCategoryChange: function (e) {
    let index = e.detail.value
    let current_category = this.data.categories[index]
    this.setData({
      current_category: current_category
    })
  },
})