const app = getApp();
const myRequest = require('../../lib/api/request');

Page({
  data: {
    categories: ['All Categories','Eat', 'Drink', 'Play'],
    current_category: 'All Categories',
    current_city: 'All Cities',
    cities: [],
    posts: [],
    flip: {},
    markers: [{
      iconPath: "/commons/assets/icons/map-marker.png",
      id: 0,
      latitude: 31.236125946,
      longitude: 121.480010986,
      width: 20,
      height: 30
    }],
    showMap: {},
    noCards: false
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  onShareAppMessage: function (e) {
    return {
      title: "Hey! I'd like to share a gem with you!",
      desc: 'Check it out!',
      path: '/pages/share/share?postId=' + e.target.id,
      imageUrl: '/commons/assets/icons/share-card.jpg'
    }
  },

  onLoad: function (options) {
    let page = this

    this.setData({
      user_id: app.globalData.userId.id
    })

    myRequest.get({
      path: "posts?user_id=" + this.data.user_id,

      success(res) {
        console.log(res)
        page.setData({
          posts: res.data.posts,
          post_qty: res.data.post_qty,
          city_qty: res.data.city_qty,
          cities: res.data.cities
        })

        if (page.data.post_qty == 0) {
          console.log("no cards")
          page.setData({
            noCards: true
          })
        }

        let posts = page.data.posts
        let showMap = page.data.showMap
        posts.forEach(function (item, index) {
          showMap[index] = false
        })
      }

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
    console.log('flip')
    let that = this
    let posts = that.data.posts
    let id = e.currentTarget.id
    let flip = that.data.flip
    let newMarkers = that.data.markers
    newMarkers[0].latitude = posts[id].latitude
    newMarkers[0].longitude = posts[id].longitude
    if (flip[id]) {
      flip[id] = !flip[id]
    }
    else {
      posts.forEach(function (item, index) {
        flip[index] = false
      })
      flip[id] = !flip[id]
    }
    this.setData({
      markers: newMarkers,
      flip: that.data.flip,
    }) 
    setTimeout(function () {
      that.showMap(e)
    },500)
  },

  showMap: function (e) {

    let that = this
    let id = e.currentTarget.id
    let posts = that.data.posts
    let showMap = this.data.showMap
    
    if (showMap[id]) {
      // console.log('hide map')
      showMap[id] = !showMap[id]
    }
    else {
      // console.log('show map')
      posts.forEach(function (item, index) {
        showMap[index] = false
      })
      showMap[id] = !showMap[id]
    }
    this.setData({
      showMap: that.data.showMap
    }) 
  },

  // filtered
  filtered: function() {

    let page = this
    let user_id = app.globalData.userId.id
    let category = this.data.current_category
    let city = this.data.current_city
    
    myRequest.get({

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

    let index = e.detail.value
    let current_category = this.data.categories[index]
    // console.log(current_category)
    this.setData({
      current_category: current_category
    })
    this.filtered()
  },

  bindPickerCityChange: function (e) {

    let index = e.detail.value
    console.log(index)
    let current_city = this.data.cities[index]
    this.setData({
      current_city: current_city
    })
    this.filtered()
  }, 

  // show map when click
  openMap: function (e) {
    console.log(e)
    let latitude = e.currentTarget.dataset.latitude
    let longitude = e.currentTarget.dataset.longitude
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 30
    })
  }
})
