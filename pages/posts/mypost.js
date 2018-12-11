const app = getApp();
const myRequest = require('../../lib/api/request');

Page({
  data: {
    categories: ['Eat', 'Drink', 'Play'],
    cities: [],
    current_category: 'All',
    current_city: 'City',
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onShareAppMessage: function (e) {
    return {
      title: 'A nice place recoomended by your friend',
      desc: 'Please check it out!',
      path: '/pages/share/share?postId=' + e.target.id,
      imageUrl: '/images/logo.png'
    }
  },
  onLoad: function (options) {

    // console.log(this.data.markers)
    // console.log(app.globalData.userId.id)
    let page = this
    this.setData({
      user_id: app.globalData.userId.id
    })
    myRequest.get({
      path: "posts?user_id=" + this.data.user_id,
      success(res) {
        page.setData({
          posts: res.data.posts,
          post_qty: res.data.post_qty,
          city_qty: res.data.city_qty,
          cities: res.data.cities
        })
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
    console.log("share")
    wx.navigateTo({
      url: '/pages/share/share?postId=' + e.target.id,
    })
    // this.onShareAppMessage
  },

  // filtered
  filtered: function(e) {
    console.log(e)
    let page = this
    let user_id = app.globalData.userId.id
    let category = this.data.current_category
    let city = this.data.current_city
    myRequest.get({
      // path: "posts?user_id =" + user_id,
      path: "posts?category=" + category + '&city=' + city + '&user_id=' + user_id,

      success(res) {
        console.log(res)
        page.setData({
          posts: res.data.posts,
        })
      }
    })
  },

  bindPickerCategoryChange: function (e) {
    console.log('i am picker')
    let index = e.detail.value
    let current_category = this.data.categories[index]
    this.setData({
      current_category: current_category
    })
    this.filtered()
  },

  bindPickerCityChange: function (e) {
    console.log(e)
    console.log('i am picker')
    let index = e.detail.value
    let current_city = this.data.cities[index]
    this.setData({
      current_city: current_city
    })
    this.filtered()
  }
})
