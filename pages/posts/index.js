const app = getApp()
const myRequest = require('../../lib/api/request');

Page({
  data: {
    categories: ['Eat', 'Drink', 'Play'],
    cities: [],
    posts: [],
    current_category: 'All',
    current_city: 'City'
  },
  onLoad: function () {
    let page = this
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

  bindPickerCategoryChange: function(e){
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