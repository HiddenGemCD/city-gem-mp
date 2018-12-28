const app = getApp()
const myRequest = require('../../lib/api/request');
// const QQMapWX = require('../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
// const qqmap = new QQMapWX({
//   key: 'FF7BZ-WGR34-2YSUE-D2L6W-PNY6F-PQFWL'
// });
 
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
    // "latitude"=> 51.345196, "longitude"=> 12.381117,

    wx.getLocation({
      success: function(res) {
        console.log(3333,res)
        let latitude = res.latitude
        let longitude = res.longitude
        // let latitude = 51.345196
        // let longitude = 12.381117

        wx.request({ 
          url: "http://api.map.baidu.com/geocoder/v2/?location=" + latitude + "," + longitude + "&output=json&pois=1&ak=difEM6gfs3VC8dYVEjFhgHQADgl4AIyU",
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log('baidu',res.data.result.addressComponent.city);

            let current_city = res.data.result.addressComponent.city;

            myRequest.get({
              path: "get_current_city?current_city=" + current_city,
              success(res) {
                app.globalData.current_city = res.data.current_city;

                page.setData({
                  current_city: res.data.current_city,
                })
                console.log("global current city",app.globalData.current_city)
                // console.log("current city global", this.globalData.current_city)
                

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
                    // filter posts based on current location
                    console.log(page.data)
                    page.filtered()
                    
                  }
                })  

              },
              fail: function () {
                // fail
              },
              complete: function () {
                // complete
                //get all posts, city list, trending data


              }
            })
          }
        })
      },
    })
  },

// filter with category and location
  filtered: function () {
    console.log('filter with category and location')

    let page = this
    let category = page.data.current_category
    let city = page.data.current_city

    console.log("category", category)
    console.log("city", city)

    myRequest.get({
      path: "posts?category=" + category + '&city=' + city,
      success(res) {
        page.setData({
          posts: res.data.posts,
          trending_counts: res.data.trending_counts
        })
      }
    })
    console.log("filter",page.data)
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
  },

// show map when click
  showMap: function(e) {
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