const app = getApp()
const myRequest = require('../../lib/api/request');

Page({
  data: {
    posts: [],
  },
  onLoad: function () {
    let page = this
    // Fetch Items from API
    myRequest.get({
      path: "posts",
      success(res) {
        page.setData({ posts: res.data.posts })
        console.log(res.data.posts)
      }
    })
    // myRequest.get({
    //   path: 'users',
    //   success(res) {
    //     page.setData({ users: res.data.users })
    //     // console.log(page.data)
    //   }
    // })
  },
  // goAllposts: function () {
  //   wx.navigateTo({
  //     url: '/pages/list/index'
  //   })
  // },
  // goMyposts: function () {
  //   wx.navigateTo({
  //     url: '/pages/list/mylist'
  //   })
  // },
  newPost: function () {
    wx.navigateTo({
      url: '/pages/posts/new'
    })
  }
  // viewList: function (e) {
  //   // console.log(e.target)
  //   const user_id = e.target.id;
  //   const avatar_url = e.target.dataset.avatar_url;
  //   // console.log(avatar_url);
  //   wx.navigateTo({
  //     url: '/pages/list/visitlist?user_id=' + user_id + '&avatar_url=' + avatar_url,
  //   })
  // }
})