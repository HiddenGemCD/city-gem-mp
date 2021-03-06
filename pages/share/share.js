// pages/share/share.js
const app = getApp();
const myRequest = require('../../lib/api/request');

Page({
  data: {
    markers: [{
      iconPath: "/commons/assets/icons/map-marker.png",
      id: 0,
      latitude: 31.236125946,
      longitude: 121.480010986,
      width: 15,
      height: 20,
      cardDeleted: false
    }
    ],
  },
  onLoad: function (options) {
    let page = this
    console.log(options)
    this.setData({
      postId: options.postId
    })
    console.log(2222,this.data)
    myRequest.get({
      path: "posts/" + page.data.postId,
      success(res) {
        console.log(res)
        if (res.statusCode < 400) {
          page.setData({
            post: res.data.post,
            city: res.data.city,
            shared_by: res.data.shared_by
          })
        } else {
          page.setData({
            cardDeleted: true
          })
        }

        let newMarkers = page.data.markers
        newMarkers[0].latitude = page.data.post.latitude
        newMarkers[0].longitude = page.data.post.longitude
        page.setData({
          markers: newMarkers,
        })
      }
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },
  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
  },
  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  goToLanding: function () {
    console.log("Go to landing")
    wx.redirectTo({
      url: '/pages/landing/landing',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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