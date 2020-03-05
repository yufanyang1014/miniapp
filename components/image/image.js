// components/image/image.js
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

const classes = 'ibuy-image';
Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    customClass: {
      type: String,
      value: '',
    },
    src: {
      type: String,
      value: '',
    },
    mode: {
      type: String,
      value: 'widthFix',
    },
    storage: {
      type: Number,
      value: 1,
    },
    markType: {
      type: Number,
      value: 0,
    },
    countCorn: {
      type: Boolean,
      value: false,
    },
    cornSize: {
      type: Boolean,
      value: false,
    },
    doubleEleven: {
      type: Boolean,
      value: false,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {

  },
  computed: {
    classes() {
      return `${classes} ${this.data.customClass}`;
    },
    filterSrc() {
      const { src } = this.data;
      return src.split('!')[0];
    },
    markTypestyles() {
      return `backgroundColor:${this.data.markTypeBackgroundColor};color:${this.datamarkTypeColor}`;
    },
    markTypeStr() {
      return {
        1: '单品', 2: '专栏', 3: '套餐', 4: '精品',
      }[this.data.markType];
    },
    markTypeBackgroundColor() {
      return {
        1: '#11BF5A', 2: '#FF2C63', 3: '#1A77FF', 4: '#000000',
      }[this.data.markType];
    },
    markTypeColor() {
      return {
        1: '#fff', 2: '#fff', 3: '#fff', 4: '#FFD42C',
      }[this.data.markType];
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },
});
