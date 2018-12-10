// pages/posts/edit.js
const app = getApp();
const myRequest = require('../../lib/api/request');

Page({
  data: {
    name: 'Choose Location',
    tabTxt: [
      {
        'text': 'Category',
        'originalText': 'Category',
        'active': false,
        'child': [
          { 'id': 1, 'text': 'eat' },
          { 'id': 2, 'text': 'drink' },
          { 'id': 3, 'text': 'play' }
        ],
        'type': 0
      }
    ],
    searchParam: []
  },
  onLoad: function (e) {
    console.log(this.data.tabTxt.text)
    let page = this;
    page.setData({
      post_id: e.id,
      user_id: app.globalData.userId.id,
    });
    const user_id = this.data.user_id;
    const post_id = this.data.post_id;
    console.log(user_id);
    console.log(post_id);

    myRequest.get({
      path: 'posts/' + post_id,
      success(res) {
        console.log(res)
        page.setData({
          name: res.data.post.name,
          description: res.data.post.description,
          tagstring: res.data.post.tagstring,
          address: res.data.post.address,

        });
      }
    });
  },
  bindSubmit: function (e) {
    let page = this;
    const user_id = this.data.user_id;
    const post_id = this.data.post_id;
    wx.showToast({ title: 'Sending...', icon: 'loading', duration: 1000     })
    // Post new card to API
    myRequest.put({
      path: 'users/' + user_id + '/posts/' + post_id,
      data: {
        post: {
          // name: e.detail.value.name,
          name: page.data.name,
          description: e.detail.value.description,
          address: page.data.address,
          latitude: page.data.latitude,
          longitude: page.data.longitude,
          category: page.data.searchParam[0],
          tagstring: e.detail.value.tagstring
        }
      },
      success(res) {
        console.log(res)
      }
    });
    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/posts/mypost'
      })
    }, 1000)
  },
  openSetting: function () {
    wx.getSetting({
      success(res) {
        console.log(22, res)
      }
    })
  },
  getPlace: function () {
    var page = this;
    app.getPermission(page); // Enter     that value to set the content directly on the app.js page  
  },
  filterTab: function (e) {
    var that = this;
    var data = JSON.parse(JSON.stringify(that.data.tabTxt));
    var index = e.currentTarget.dataset.index;
    var newTabTxt = data.map(function (e) {
      e.active = false;
      return e;
    });
    newTabTxt[index].active = !that.data.tabTxt[index].active;
    this.setData({
      tabTxt: data
    })
  },
  filterTabChild: function (e) {

    //我需要切换选中项 修改展示文字 并收回抽屉  
    var that = this;
    var index = e.currentTarget.dataset.index;
    var data = JSON.parse(JSON.stringify(that.data.tabTxt));
    if (typeof (e.target.dataset.id) == 'undefined' || e.target.dataset.id == '') {
      data[index].active = !that.data.tabTxt[index].active;
    }
    else {
      data[index].type = e.target.dataset.id;
      data[index].active = !that.data.tabTxt[index].active;
      if (e.target.dataset.id == '0') {
        data[index].text = that.data.tabTxt[index].originalText;
        //不限删除条件
        delete that.data.searchParam[index];
      }
      else {
        data[index].text = e.target.dataset.txt;
        //更改删除条件
        that.data.searchParam[index] = data[index].text;
      }
    }
    that.setData({
      tabTxt: data
    })
    console.log(that.data.searchParam);
  }



})
