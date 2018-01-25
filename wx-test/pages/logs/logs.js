//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
  },
  onLoad: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(function (log) {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    console.log(title)
    console.log(options.title)
    this.setData({
      title: options.title
    })
  }
})
