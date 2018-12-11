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
      width: 20,
      height: 30
    }
    ],
  },
  onShareAppMessage: function () {
    return {
      title: 'A nice place recoomended by your friend',
      desc: 'Please check it out!',
      path: '/page/share/share'
    }
  },
  onLoad: function (options) {

    // console.log(this.data.markers)
    // console.log(app.globalData.userId.id)
    let page = this
    let user_id = app.globalData.userId.id

    myRequest.get({
      path: "posts?user_id=" + user_id,
      success(res) {
        page.setData({ posts: res.data.posts,
          post_qty: res.data.post_qty,
          city_qty: res.data.city_qty,
         })
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
    console.log('flip')
    let that = this
    let posts = that.data.posts
    let id = e.currentTarget.id
    let flip = that.data.flip

    let newMarkers = that.data.markers
    
    newMarkers[0].latitude = posts[id].latitude
    newMarkers[0].longitude = posts[id].longitude
    console.log(333,newMarkers)
    console.log(flip[id])
    if (flip[id]) {
      flip[id] = !flip[id]
    }
    else {
      posts.forEach(function (item, index) {
        flip[index] = false
      })
      flip[id] = !flip[id]
    }
    console.log(flip[id])

    // flip[id] = !flip[id]

    this.setData({
      markers: newMarkers,
      flip: that.data.flip,
    })

    
  },
  // share function
  share: function(e){
    console.log(e)
    this.onShareAppMessage
  },

  // filtered
  filtered: function() {
    let page = this
    let user_id = app.globalData.userId.id
    let category = 'play'
    let city = '四川省'
    myRequest.get({
      // path: "posts?user_id =" + user_id,
      path: "posts?category=" + category + '&city=' + city + '&user_id=' + user_id,

      success(res) {
        page.setData({
          posts: res.data.posts,
        })
      }
    })
  }
})
