const app = getApp()
const myRequest = require('../../lib/api/request');

Page({
  data: {
    posts: [],
    vote: false
  },
  onLoad: function () {
    let page = this
    // Fetch Items from API
    myRequest.get({
      path: "posts?user_id=" + app.globalData.userId.id,
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
  vote: function (e) {
    console.log('vote!')
    let page = this
    let posts = page.data.posts
    let id = e.target.id
    let postId = posts[id].id
    let user_id = app.globalData.userId.id
    myRequest.put({
      path: 'users/' + user_id + '/posts/' + postId + '/upvote',
      success(res) {
        // page.setData({ posts: res.data.posts })
        console.log(res)
        if (res.errMsg === "request:ok") {
          let posts = page.data.posts
          console.log(posts)
          posts[id].votes += 1
          posts[id].upvoted_by_current_user = true
          page.setData({
            posts
          })
        }
      }
    })
    let vote = this.data.vote
    this.setData({ vote: !vote })
  },
  unvote: function (e) {
    console.log('unvote!')
    console.log(e)
    let page = this
    let posts = page.data.posts
    let id = e.target.id
    let postId = posts[id].id
    let user_id = app.globalData.userId.id
    myRequest.put({
      path: 'users/' + user_id + '/posts/' + postId + '/unvote',
      success(res) {
        // page.setData({ posts: res.data.posts })
        console.log(res)
        if (res.errMsg === "request:ok") {
          let posts = page.data.posts
          console.log(posts)
          posts[id].votes -= 1
          posts[id].upvoted_by_current_user = false
          page.setData({
            posts
          })
        }
      }
    })
    let vote = this.data.vote
    this.setData({ vote: !vote })
  }
})