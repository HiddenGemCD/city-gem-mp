const app = getApp()
const myRequest = require('../../lib/api/request');
const QQMapWX = require('../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
// 实例化API核心类
const qqmap = new QQMapWX({
  key: 'FF7BZ-WGR34-2YSUE-D2L6W-PNY6F-PQFWL' // 必填
});
 
Page({

  data: {
    cities: [],
    posts: [],
    current_category: '',
    current_city: ''
  },

  onLoad: function () {
    let page = this
    // get and set current user's location....
    wx.getLocation({
      success: function(res) {
        // console.log(res)
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
                console.log('now current city...')
                console.log(page.data.current_city)
                console.log(page.data)

                myRequest.get({
                  path: "posts",
                  success(res) {
                    console.log(res)
                    page.setData({
                      posts: res.data.posts,
                      cities: res.data.cities,
                      trending_counts: res.data.trending_counts
                    })

                    // filtering....
                    page.filtered()
                  }
                })  
              }
            }) 
          },
        });
      },
    })
  },
  
  newPost: function () {
    wx.navigateTo({
      url: '/pages/posts/new'
    })
  },

  filtered: function () {
    console.log('filter!')
    console.log(this.data)
    let page = this
    let category = page.data.current_category
    let city = page.data.current_city

    console.log(this.data.posts)

    myRequest.get({
      path: "posts?category=" + category + '&city=' + city,
      success(res) {
        page.setData({
          posts: res.data.posts,
        })
      }
    })
  },

  selectCategory: function (e) {
    let current_category = e.target.id
    if (this.data.current_category == current_category){
      this.setData({
        current_category: ''
      })
    } else {
      this.setData({
        current_category: current_category
      })
    }
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