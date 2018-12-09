const app = getApp();
const myRequest = require('../../lib/api/request');

Page({
  data: {
    posts: [],
    flip: {}
  },
  onLoad: function (options) {
    // console.log(app.globalData.userId.id)
    let page = this
    let user_id = app.globalData.userId.id
    myRequest.get({
      path: "posts?user_id =" + app.globalData.userId.id,
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
  flip: function (e) {
    // this.setData({
    //   _num: e.currentTarget.id
    // })
    
    let that = this
    let id = e.currentTarget.id
    let flip = that.data.flip
    // console.log(flip[id])
    // console.log(flip[e.currentTarget.id])
    flip[id] = !flip[id]
    console.log(flip[id])

    this.setData({
      flip: that.data.flip
    })

  }
})
