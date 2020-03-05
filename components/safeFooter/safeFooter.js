// components/safeFooter/safeFooter.js
import regeneratorRuntime from '../../miniprogram_npm/regenerator-runtime/index';
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

const classes = 'ibuy-safe-footer';
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
    fixed: {
      type: Boolean,
      value: true,
    },
    customClass: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  computed: {
    isNotch() {
      const { model, screenHeight } = wx.getSystemInfoSync();
      const iphoneX = /iphone x/i.test(model);
      const iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
      return iphoneX || iphoneNew;
    },
    classes() {
      return `${classes} ${this.data.fixed ? 'fixed' : ''} ${this.data.isNotch ? 'notch' : ''} ${this.data.customClass}`;
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
});
