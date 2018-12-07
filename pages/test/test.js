const app = getApp();
const myRequest = require('../../lib/api/request');

Page({
  data: {
    posts: []
  },
  onLoad: function (options) {
    // console.log(app.globalData.userId.avatar)
    let page = this
    let user_id = app.globalData.userId.id
    page.setData( {user: app.globalData.userId})
    myRequest.get({
      path: 'users/' + user_id + '/posts/by_recent',
      success(res) {
        page.setData({ posts: res.data.posts })
      }
    })
  },
  newPost: function () {
    wx.navigateTo({
      url: '/pages/posts/new'
    })
  },
  editPost: function (e) {
    const post_id = e.target.id;
    wx.navigateTo({
      url: '/pages/posts/edit?id=' + post_id
    })
  },
  deletePost: function (e) {
    console.log(e.target)
    const post_id = e.target.id;
    console.log(post_id)
    myRequest.delete({
      path: 'posts/' + post_id,
      success(res) {
        wx.reLaunch({
          url: '/pages/posts/mypost'
        })
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})