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
    image: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    name: {
      type: String,
      value: '',
    },
    time: {
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
      wx.navigateTo({ url: '/pages/home/detail/detail' })
    },
  }
})
