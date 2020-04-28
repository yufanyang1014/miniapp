// pages/home/components/list/list.js
import computedBehavior from '../../../../miniprogram_npm/miniprogram-computed/index';

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
    objJson: {
      type: Object,
      value: {},
    },
    linkUrl: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    bannerName: {
      type: String,
      value: '',
    },
    channel: {
      type: String,
      value: '',
    },
    fifthItem: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigatePage() {
      const { objJson } = this.data;
      const json = JSON.stringify(objJson);
      const url = `/pages/home/detail/detail?obj=${json}`
      wx.navigateTo({ url });
    },
  }
})
