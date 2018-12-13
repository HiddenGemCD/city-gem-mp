// pages/posts/edit.js
const app = getApp();
const myRequest = require('../../lib/api/request');

Page({
  data: {
    categories: ['Eat', 'Drink', 'Play'],
    current_category: 'Category',
    name: 'Select Location',
    array: ['Eat', 'Drink', 'Play'],
    index: 0
  },
  onLoad: function (e) {
    let page = this;
    page.setData({
      post_id: e.id,
      user_id: app.globalData.userId.id,
    });
    const user_id = this.data.user_id;
    const post_id = this.data.post_id;

    myRequest.get({
      path: 'posts/' + post_id,
      success(res) {
        page.setData({
          current_category: res.data.post.category,
          name: res.data.post.name,
          description: res.data.post.description,
          tagstring: res.data.post.tagstring,
          address: res.data.post.address,

        });
      }
    });
  },
  bindSubmit: function (e) {
    let page = this;
    const user_id = this.data.user_id;
    const post_id = this.data.post_id;
    console.log(user_id)
    console.log(post_id)
    wx.showToast({ title: 'Sending...', icon: 'loading', duration: 1000     })
    myRequest.put({
      path: 'users/' + user_id + '/posts/' + post_id,
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
  
  openSetting: function () {
    wx.getSetting({
      success(res) {
        console.log(22, res)
      }
    })
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
