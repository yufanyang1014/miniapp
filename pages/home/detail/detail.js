// pages/home/detail/detail.js
import computedBehavior from '../../../miniprogram_npm/miniprogram-computed/index';

Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    curDetail: {},
  },

  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    const curDetail = JSON.parse(options.obj);
    this.setData({
      curDetail,
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
