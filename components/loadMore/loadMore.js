// components/loadMore/loadMore.js
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index.js';

const prefixClass = 'zebra-loadmore';

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
    showLoading: {
      type: Boolean,
      value: true,
    },
    tip: {
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
    classes() {
      return `${prefixClass} ${this.data.showLoading ? '' : `${prefixClass}-line`}`;
    },
    classIcon() {
      return `${prefixClass}-icon`;
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
