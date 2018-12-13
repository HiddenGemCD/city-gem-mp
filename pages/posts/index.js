const app = getApp()
const myRequest = require('../../lib/api/request');
const QQMapWX = require('../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
const qqmap = new QQMapWX({
  key: 'FF7BZ-WGR34-2YSUE-D2L6W-PNY6F-PQFWL'
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
// get and set current user's location and use qqmap api to get current city
    wx.getLocation({
      success: function(res) {
        let latitude = res.latitude
        let longitude = res.longitude

        qqmap.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res.result.ad_info.city);
            let current_city = res.result.ad_info.city;

// convert city name to english
            myRequest.get({
              path: "get_current_city?current_city=" + current_city,
              success(res) {
                page.setData({
                  current_city: res.data.current_city,
                })
                console.log('now current city...')
                console.log(page.data.current_city)
                console.log(page.data)

//get all posts, city list, trending data
                myRequest.get({
                  path: "posts",
                  success(res) {
                    console.log(res)
                    page.setData({
                      posts: res.data.posts,
                      cities: res.data.cities,
                      trending_counts: res.data.trending_counts
                    })

// filter posts based on current location
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

// filter with category and location
  filtered: function () {
    console.log('filter with category and location')

    let page = this
    let category = page.data.current_category
    let city = page.data.current_city

    myRequest.get({
      path: "posts?category=" + category + '&city=' + city,
      success(res) {
        page.setData({
          posts: res.data.posts,
          trending_counts: res.data.trending_counts
        })
      }
    })
  },

// select catgory and filter
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

// select city and filter
  bindPickerCityChange: function (e) {
    let index = e.detail.value
    let current_city = this.data.cities[index]
    this.setData({
      current_city: current_city
    })
    this.filtered()
  }
})