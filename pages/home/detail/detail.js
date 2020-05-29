// pages/home/detail/detail.js
import computedBehavior from '../../../miniprogram_npm/miniprogram-computed/index';
import { dateFormate } from '../../../utils/index';

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

  /**
   * 组件的方法列表
   */
  methods: {
  /**
    * 用户点击右上角分享
    */
  onShareAppMessage() {

  },
    onPullDownRefresh() {
      wx.stopPullDownRefresh();
    },
    onLoad() {
      // 生命周期函数--监听页面加载
      const json = wx.getStorageSync('json') || '';
      const curDetail = JSON.parse(json);
      curDetail.channel = dateFormate('yyyy-MM-dd', new Date(curDetail.channel));
      this.setData({
        curDetail,
      })
    },

  }
})
