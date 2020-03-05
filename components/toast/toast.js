// components/toast/toast.js
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

const prefix = 'zebra-toast';

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
    show: Boolean,
    mask: Boolean,
    message: String,
    forbidClick: Boolean,
    zIndex: {
      type: Number,
      value: 1000,
    },
    type: {
      type: String,
      value: 'text',
    },
    loadingType: {
      type: String,
      value: 'circular',
    },
    position: {
      type: String,
      value: 'middle',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  computed: {
    classes() {
      const { type, position } = this.data;
      return `${prefix} ${prefix}--${type === 'info' ? 'info' : 'icon'} ${prefix}--${position}`;
    },
    iconClasses() {
      const { type } = this.data;
      const icons = {
        success: 'iconfont-chenggong', fail: 'iconfont-cry', error: 'iconfont-shibai', info: '', loading: '', warning: 'iconfont-warning',
      };
      return `${prefix}__icon ${icons[type]}`;
    },
    transitionName() {
      return `${prefix}-fade`;
    },
  },
  observers: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clear() {
      this.setData({
        show: false,
      });
    },
    // for prevent touchmove
    noop: function noop() {},
  },
  lifetimes: {

  },
});
