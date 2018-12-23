const app = getApp()
const myRequest = require('../../lib/api/request');
const QQMapWX = require('../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
const qqmap = new QQMapWX({
  key: 'FF7BZ-WGR34-2YSUE-D2L6W-PNY6F-PQFWL'
});



Page({
  data: {
    categories: ['Eat', 'Drink', 'Play'],
    // current_category: 'Category',
    name: 'Select Location',
    array: ['Eat', 'Drink', 'Play'],
    index: 0,
    validate: false
  },

  onLoad: function () {
    console.log("loading gb data for create")
  },

  bindSubmit: function (e) {
    console.log("submit..")
    let page = this;
    wx.showToast({ title: 'Sending...', icon: 'loading', duration: 1000 })

    let data = e

    this.validate(data);
    console.log(page.data)
    if (page.data.validate) {
      console.log('validate ok')
      // Post new card to API
      qqmap.reverseGeocoder({
        location: {
          latitude: page.data.latitude,
          longitude: page.data.longitude
        },
        success: function (res) {
          console.log(res.result.ad_info.city);
          let current_city = res.result.ad_info.city;
          page.setData({
            current_city: current_city
          })
          console.log(444, page.data.current_city)

          myRequest.post({
            path: 'users/' + app.globalData.userId.id + '/posts' + '?city=' + page.data.current_city,
            data: {
              post: {
                name: page.data.name,
                description: e.detail.value.description,
                address: page.data.address,
                latitude: page.data.latitude,
                longitude: page.data.longitude,
                category: page.data.current_category,
                tagstring: e.detail.value.tagstring
              }
            },
            success(res) {
              console.log(res)
            }
          })
        }
      })
      


      setTimeout(function () {
        wx.reLaunch({
          url: '/pages/posts/mypost'
        })
      }, 1000)

    } 
  },

  validate: function(e){
    console.log('hey')
    let page = this

    if (!page.data.current_category) {
      console.log("no category")
      let validate = null
      page.setData({
        noCategoryMessage: 'Please select category.',
      })
    } else {
      page.setData({
        noCategoryMessage: null
      })
    }

    if (page.data.name == 'Select Location') {
      console.log("no location")
      let validate = null
      page.setData({
        noLocationMessage: 'Please select location.',
      })
    } else {
      page.setData({
        noLocationMessage: null
      })
    }

    if (e.detail.value.description == '') {
      console.log("no description")
      let validate = null
      page.setData({
        noDescriptionMessage: 'Please add description.',
      })
    } else {
      page.setData({
        noDescriptionMessage: null
      })
    }

    if (!e.detail.value.tagstring) {
      console.log("no tags")
      let validate = null
      page.setData({
        noTagMessage: 'Please add tags.',
      })
    } else {
      page.setData({
        noTagMessage: null
      })
    }

    if ( page.data.noCategoryMessage || page.data.noDescriptionMessage || page.data.noLocationMessage || page.data.noTagMessage ) {
      page.setData({
        validate: false
      })
    } else {
      page.setData({
        validate: true
      })

    }
  },

  getPlace: function () {
    var page = this;
    app.getPermission(page);
  },
  
  bindPickerCategoryChange: function (e) {
    let index = e.detail.value
    let current_category = this.data.categories[index]
    this.setData({
      current_category: current_category
    })
  },
})