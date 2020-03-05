// components/actionRadio/actionRadio.js
import regeneratorRuntime from '../../miniprogram_npm/regenerator-runtime/index';
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

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
    value: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '',
    },
    values: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    index: -1,
    currentValue: '',
  },
  observers: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    handlerCancel() {
      this.triggerEvent('input', { value: false });
      this.triggerEvent('cancel');
    },
    handlerConfirm() {
      this.triggerEvent('input', { value: false });
      this.triggerEvent('confirm', { value: this.data.values[this.data.index] });
    },
    handlerChange(e) {
      const { index } = e.currentTarget.dataset;
      this.setData({ index });
    },
  },
});
