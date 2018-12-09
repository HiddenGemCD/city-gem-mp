const app = getApp();
const myRequest = require('../../lib/api/request');

Page({
  data: {
    posts: [],
    flip: {},
    markers: [{
      iconPath: "/commons/assets/icons/map-marker.png",
      id: 0,
      latitude: 31.236125946,
      longitude: 121.480010986,
      width: 30,
      height: 30
    },
    // {
    //   iconPath: "/commons/assets/icons/map-marker.png",
    //   id: 1,
    //   latitude: 30.65618,
    //   longitude: 104.08329,
    //   width: 30,
    //   height: 30
    // }
    ],
  },
  onLoad: function (options) {

    console.log(this.data.markers)
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
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
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
  includePoints: function () {

  },
  flip: function (e) {
    let that = this
    let posts = that.data.posts
    let id = e.currentTarget.id
    let flip = that.data.flip

    let markers = that.data.markers
    markers.latitude = posts[id].latitude
    markers.longitude = posts[id].longitude



    posts.forEach(function (item, index) {
      flip[index] = false
    })

    flip[id] = !flip[id]

    this.setData({
      markers: that.data.markers,
    })

    this.setData({
      flip: that.data.flip,
    })
    console.log(markers)
    console.log(this.data)
    
  }
})
