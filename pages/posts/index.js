const app = getApp()
const myRequest = require('../../lib/api/request');

Page({
  data: {
    categories: ['Eat', 'Drink', 'Play'],
    cities: ['北京', '上海', '广州', '深圳', '武汉', '西安', '杭州', '南京', '成都', '重庆', '东莞', '大连', '沈阳', '苏州', '昆明', '长沙', '合肥', '宁波', '郑州', '天津', '青岛', '济南', '哈尔滨', '长春', '福州', '广东省', '江苏省', '浙江省', '四川省', '海南省', '福建省', '山东省', '江西省', '广西', '安徽省', '河北省', '河南省', '湖北省', '湖南省', '陕西省', '山西省', '黑龙江省', '辽宁省', '吉林省', '云南省', '贵州省', '甘肃省', '内蒙古', '宁夏', '西藏', '新疆', '青海省', '香港', '澳门'],
    posts: [],
    current_category: 'All',
    current_city: 'City'
  },
  onLoad: function () {
    let page = this
    myRequest.get({  
      path: "posts",
      success(res) {
        page.setData({ posts: res.data.posts })
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