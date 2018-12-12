const app = getApp()
const myRequest = require('../../lib/api/request');

var QQMapWX = require('../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmap = new QQMapWX({
  key: 'FF7BZ-WGR34-2YSUE-D2L6W-PNY6F-PQFWL' // 必填
});
 

Page({
  data: {
    // categories: ['Eat', 'Drink', 'Play'],
    cities: [],
    posts: [],
    current_category: '',
    current_city: ''
  },

  onLoad: function () {
    let page = this
    wx.getLocation({
      success: function(res) {
        console.log(res)
        let latitude = res.latitude
        let longitude = res.longitude
        // 调用接口
        qqmap.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res.result.ad_info.city);
            let current_city = res.result.ad_info.city;
            myRequest.get({
              path: "get_current_city?current_city=" + current_city,
              success(res) {
                page.setData({
                  current_city: res.data.current_city,
                })
              }
            })
          },
        });
      },
    })
    myRequest.get({  
      path: "posts",
      success(res) {
        page.setData({ 
          posts: res.data.posts,
          cities: res.data.cities
          })
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
    // let user_id = app.globalData.userId.id
    let category = this.data.current_category
    let city = this.data.current_city
    myRequest.get({
      path: "posts?category=" + category + '&city=' + city,
      success(res) {
        console.log(res)
        page.setData({
          posts: res.data.posts,
        })
      }
    })
  },

  // bindPickerCategoryChange: function(e){
  //   console.log('i am picker')
  //   let index = e.detail.value
  //   let current_category = this.data.categories[index]
  //   this.setData({
  //     current_category: current_category
  //   })
  //   this.filtered()
  // },

  selectCategory: function (e) {
    console.log(111,'select category')
    let current_category = e.target.id
    console.log(e)
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