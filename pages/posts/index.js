const app = getApp()
const myRequest = require('../../lib/api/request');

Page({
  data: {
    posts: [],
  },
  onLoad: function () {
    let page = this
    myRequest.get({  
      path: "posts",
      success(res) {
        page.setData({ posts: res.data.posts })
        console.log(res.data.posts)
      }
    })
  },
  newPost: function () {
    wx.navigateTo({
      url: '/pages/posts/new'
    })
  },

  filtered: function () {
    console.log('filter!')
    let page = this
    let user_id = app.globalData.userId.id
    let category = 'drink'
    let city = '上海'
    myRequest.get({
      path: "posts?category=" + category + '&city=' + city,
      success(res) {
        page.setData({
          posts: res.data.posts,
        })
      }
    })
  }
})