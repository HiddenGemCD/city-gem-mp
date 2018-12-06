// pages/posts/edit.js
const app = getApp();
const myRequest = require('../../lib/api/request');

Page({
  data: {
  },
  onLoad: function (e) {
    console.log(e.id)
    let page = this;
    page.setData({
      post_id: e.id,
      user_id: app.globalData.userId.id
    });
    const user_id = this.data.user_id;
    const post_id = this.data.post_id;
    console.log(user_id);
    console.log(post_id);

    myRequest.get({
      path: 'posts/' + post_id,
      success(res) {
        console.log(res)
        page.setData({
          name: res.data.post.name,
          description: res.data.post.description
        });
      }
    });
  },
  bindSubmit: function (e) {
    let page = this;
    const user_id = this.data.user_id;
    const post_id = this.data.post_id;
    wx.showToast({ title: 'Sending...', icon: 'loading', duration: 1000 })
    // Post new card to API
    myRequest.put({
      path: 'users/' + user_id + '/posts/' + post_id,
      data: {
        post: {
          name: e.detail.value.name,
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
  }
})
